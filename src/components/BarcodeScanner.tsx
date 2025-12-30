import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Button } from '@/components/ui/button'
import { isValidISBN } from '@/lib/isbnLookup'

interface BarcodeScannerProps {
  onScan: (isbn: string) => void
  onError: (error: string) => void
  onClose: () => void
}

export function BarcodeScanner({ onScan, onError, onClose }: BarcodeScannerProps) {
  const [isStarting, setIsStarting] = useState(true)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const hasScannedRef = useRef(false)

  useEffect(() => {
    const scannerId = 'barcode-scanner-container'
    let mounted = true

    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode(scannerId)
        scannerRef.current = scanner

        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 150 },
            aspectRatio: 1.5,
          },
          (decodedText) => {
            // Prevent multiple scans
            if (hasScannedRef.current) return

            if (isValidISBN(decodedText)) {
              hasScannedRef.current = true
              // Play success sound/vibration
              if (navigator.vibrate) {
                navigator.vibrate(100)
              }
              onScan(decodedText)
            }
          },
          () => {
            // Ignore scan failures (continuous scanning)
          }
        )

        if (mounted) {
          setIsStarting(false)
        }
      } catch (err) {
        if (!mounted) return

        const errorMessage = err instanceof Error ? err.message : String(err)

        if (errorMessage.includes('Permission') || errorMessage.includes('NotAllowed')) {
          setPermissionDenied(true)
          onError('Permission caméra refusée')
        } else if (errorMessage.includes('NotFound') || errorMessage.includes('no camera')) {
          onError('Aucune caméra détectée')
        } else {
          onError(`Erreur scanner: ${errorMessage}`)
        }

        setIsStarting(false)
      }
    }

    startScanner()

    return () => {
      mounted = false
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {
          // Ignore stop errors
        })
      }
    }
  }, [onScan, onError])

  if (permissionDenied) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="text-4xl mb-4">📷</div>
        <h3 className="font-semibold text-lg mb-2">Accès caméra refusé</h3>
        <p className="text-muted-foreground mb-4">
          Pour scanner des codes-barres, autorisez l'accès à la caméra dans les paramètres de votre navigateur.
        </p>
        <Button onClick={onClose} variant="outline">
          Saisie manuelle
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-full max-w-sm aspect-[4/3] bg-black rounded-lg overflow-hidden"
      >
        <div id="barcode-scanner-container" className="w-full h-full" />

        {isStarting && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-white text-center">
              <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2" />
              <p>Démarrage de la caméra...</p>
            </div>
          </div>
        )}

        {/* Scanning overlay */}
        {!isStarting && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-24 border-2 border-primary rounded-lg">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-primary rounded-tl" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-primary rounded-tr" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-primary rounded-bl" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-primary rounded-br" />
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground mt-3 text-center">
        Placez le code-barres du livre dans le cadre
      </p>

      <Button
        onClick={onClose}
        variant="ghost"
        className="mt-4"
      >
        Annuler
      </Button>
    </div>
  )
}
