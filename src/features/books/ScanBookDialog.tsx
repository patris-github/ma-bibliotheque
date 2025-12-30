import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { BarcodeScanner } from '@/components/BarcodeScanner'
import { BookForm } from '@/features/books/BookForm'
import { useAddBook } from '@/features/books/useBooks'
import { fetchBookByISBN, type BookFromISBN } from '@/lib/isbnLookup'
import type { BookFormData } from '@/features/books/bookSchema'
import { toast } from 'sonner'

type ScanState = 'scanning' | 'loading' | 'form' | 'not-found'

interface ScanBookDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScanBookDialog({ open, onOpenChange }: ScanBookDialogProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [scanState, setScanState] = useState<ScanState>('scanning')
  const [scannedBook, setScannedBook] = useState<BookFromISBN | null>(null)
  const [scannedISBN, setScannedISBN] = useState<string>('')
  const addBook = useAddBook()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setScanState('scanning')
      setScannedBook(null)
      setScannedISBN('')
    }
  }, [open])

  const handleScan = async (isbn: string) => {
    setScannedISBN(isbn)
    setScanState('loading')

    const book = await fetchBookByISBN(isbn)

    if (book && book.titre) {
      setScannedBook(book)
      setScanState('form')
      toast.success('Livre trouvé !')
    } else {
      setScanState('not-found')
    }
  }

  const handleScanError = (error: string) => {
    toast.error(error)
    if (error.includes('refusé')) {
      // Permission denied - let scanner component handle UI
    }
  }

  const handleSubmit = async (data: BookFormData) => {
    try {
      await addBook.mutateAsync(data)
      toast.success('Livre ajouté')
      onOpenChange(false)
    } catch {
      toast.error("Erreur lors de l'ajout du livre")
    }
  }

  const handleRetry = () => {
    setScanState('scanning')
    setScannedBook(null)
    setScannedISBN('')
  }

  const handleManualEntry = () => {
    setScanState('form')
    setScannedBook(null)
  }

  const renderContent = () => {
    switch (scanState) {
      case 'scanning':
        return (
          <BarcodeScanner
            onScan={handleScan}
            onError={handleScanError}
            onClose={() => onOpenChange(false)}
          />
        )

      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mb-4" />
            <p className="text-muted-foreground">Recherche du livre...</p>
            <p className="text-sm text-muted-foreground mt-1">ISBN: {scannedISBN}</p>
          </div>
        )

      case 'not-found':
        return (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="font-semibold text-lg mb-2">Livre non trouvé</h3>
            <p className="text-muted-foreground mb-2">
              Aucun livre trouvé pour le code-barres scanné.
            </p>
            <p className="text-sm text-muted-foreground mb-6">ISBN: {scannedISBN}</p>
            <div className="flex gap-2">
              <Button onClick={handleRetry} variant="outline">
                Réessayer
              </Button>
              <Button onClick={handleManualEntry}>
                Saisie manuelle
              </Button>
            </div>
          </div>
        )

      case 'form':
        return (
          <div>
            {scannedBook && (
              <p className="text-sm text-muted-foreground mb-4">
                Vérifiez les informations et ajustez si nécessaire.
              </p>
            )}
            <BookForm
              defaultValues={
                scannedBook
                  ? {
                      titre: scannedBook.titre,
                      auteur: scannedBook.auteur,
                      statut: 'a_lire',
                    }
                  : undefined
              }
              onSubmit={handleSubmit}
              isLoading={addBook.isPending}
            />
          </div>
        )
    }
  }

  const getTitle = () => {
    switch (scanState) {
      case 'scanning':
        return 'Scanner un livre'
      case 'loading':
        return 'Recherche...'
      case 'not-found':
        return 'Livre non trouvé'
      case 'form':
        return scannedBook ? 'Confirmer le livre' : 'Ajouter un livre'
    }
  }

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-auto max-h-[90vh]">
          <SheetHeader>
            <SheetTitle>{getTitle()}</SheetTitle>
          </SheetHeader>
          <div className="mt-4">{renderContent()}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}
