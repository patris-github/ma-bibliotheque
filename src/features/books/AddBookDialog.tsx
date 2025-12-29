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
import { useAddBook } from '@/features/books/useBooks'
import type { BookFormData } from '@/features/books/bookSchema'
import { toast } from 'sonner'

interface AddBookDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddBookDialog({ open, onOpenChange }: AddBookDialogProps) {
  const [isMobile, setIsMobile] = useState(false)
  const addBook = useAddBook()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSubmit = async (data: BookFormData) => {
    try {
      await addBook.mutateAsync(data)
      toast.success('Livre ajouté')
      onOpenChange(false)
    } catch {
      toast.error("Erreur lors de l'ajout du livre")
    }
  }

  const formContent = (
    <BookForm onSubmit={handleSubmit} isLoading={addBook.isPending} />
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-auto max-h-[90vh]">
          <SheetHeader>
            <SheetTitle>Ajouter un livre</SheetTitle>
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
          <DialogTitle>Ajouter un livre</DialogTitle>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  )
}
