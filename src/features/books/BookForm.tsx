import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { bookSchema, type BookFormData } from '@/features/books/bookSchema'

interface BookFormProps {
  mode?: 'add' | 'edit'
  defaultValues?: BookFormData
  onSubmit: (data: BookFormData) => void
  onCancel?: () => void
  onDelete?: () => void
  isLoading?: boolean
}

export function BookForm({
  mode = 'add',
  defaultValues,
  onSubmit,
  onCancel,
  onDelete,
  isLoading = false,
}: BookFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: defaultValues ?? {
      titre: '',
      auteur: '',
      statut: 'a_lire',
    },
  })

  const statutValue = watch('statut')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="titre">Titre</Label>
        <Input
          id="titre"
          placeholder="Titre du livre"
          disabled={isLoading}
          {...register('titre')}
        />
        {errors.titre && (
          <p className="text-sm text-destructive">{errors.titre.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="auteur">Auteur</Label>
        <Input
          id="auteur"
          placeholder="Nom de l'auteur"
          disabled={isLoading}
          {...register('auteur')}
        />
        {errors.auteur && (
          <p className="text-sm text-destructive">{errors.auteur.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="statut">Statut</Label>
        <Select
          value={statutValue}
          onValueChange={(value: BookFormData['statut']) => setValue('statut', value)}
          disabled={isLoading}
        >
          <SelectTrigger id="statut">
            <SelectValue placeholder="Statut de lecture" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a_lire">À lire</SelectItem>
            <SelectItem value="en_cours">En cours</SelectItem>
            <SelectItem value="lu">Lu</SelectItem>
          </SelectContent>
        </Select>
        {errors.statut && (
          <p className="text-sm text-destructive">{errors.statut.message}</p>
        )}
      </div>

      <div className="flex gap-2 justify-between pt-2">
        {mode === 'edit' && onDelete ? (
          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            disabled={isLoading}
          >
            Supprimer
          </Button>
        ) : (
          <div />
        )}
        <div className="flex gap-2">
          {mode === 'edit' && onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Annuler
            </Button>
          )}
          <Button type="submit" className={mode === 'add' ? 'w-full' : ''} disabled={isLoading}>
            {isLoading
              ? mode === 'add'
                ? 'Ajout en cours...'
                : 'Enregistrement...'
              : mode === 'add'
                ? 'Ajouter'
                : 'Enregistrer'}
          </Button>
        </div>
      </div>
    </form>
  )
}
