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
import { BookForm } from '@/features/books/BookForm'
import { useUpdateBook, type Book } from '@/features/books/useBooks'
import type { BookFormData } from '@/features/books/bookSchema'
import { toast } from 'sonner'

interface EditBookDialogProps {
  book: Book | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditBookDialog({ book, open, onOpenChange }: EditBookDialogProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const updateBook = useUpdateBook()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!book) return null

  const handleSubmit = async (data: BookFormData) => {
    try {
      const wasNotLu = book.statut !== 'lu'
      const isNowLu = data.statut === 'lu'

      await updateBook.mutateAsync({ id: book.id, data })

      // Célébration si passage à "Lu"
      if (wasNotLu && isNowLu) {
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 2000)
      }

      toast.success('Livre modifié')
      onOpenChange(false)
    } catch {
      toast.error('Erreur lors de la modification du livre')
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  const defaultValues: BookFormData = {
    titre: book.titre,
    auteur: book.auteur,
    statut: book.statut,
  }

  const formContent = (
    <>
      <BookForm
        mode="edit"
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={updateBook.isPending}
      />
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="text-6xl animate-bounce">
            🎉
          </div>
        </div>
      )}
    </>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-auto max-h-[90vh]">
          <SheetHeader>
            <SheetTitle>Modifier le livre</SheetTitle>
          </SheetHeader>
          <div className="mt-4">{formContent}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le livre</DialogTitle>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  )
}
