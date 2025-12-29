import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function BookCardSkeleton() {
  return (
    <Card className="border-2 border-border rounded-[0.4rem] shadow-[var(--shadow-brutal)]">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Skeleton className="w-16 h-24 flex-shrink-0 rounded-[0.3rem]" />
          <div className="flex flex-col justify-between min-w-0 flex-1 py-1">
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-5 w-16 rounded-md" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
