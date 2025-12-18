import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function BookCardSkeleton() {
  return (
    <Card className="border-2 border-border rounded-[0.4rem] shadow-[var(--shadow-brutal)]">
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}
