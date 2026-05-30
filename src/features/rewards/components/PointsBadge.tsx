import { Card } from '@/components/ui/card'

interface PointsBadgeProps {
  points: number
}

export default function PointsBadge({ points }: PointsBadgeProps) {
  return (
    <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Your Points</p>
          <p className="text-3xl font-bold mt-1">⭐ {points}</p>
        </div>
      </div>
    </Card>
  )
}
