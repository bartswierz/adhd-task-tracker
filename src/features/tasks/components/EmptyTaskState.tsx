import { Card } from '@/components/ui/card'

export default function EmptyTaskState() {
  return (
    <Card className="p-8 text-center space-y-3 bg-muted/30 border-dashed">
      <p className="text-2xl">🎉</p>
      <p className="font-semibold">No tasks yet</p>
      <p className="text-sm text-muted-foreground">
        Add a task using the button above to get started.
      </p>
    </Card>
  )
}
