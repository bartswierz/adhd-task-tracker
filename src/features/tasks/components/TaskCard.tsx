import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Trash2 } from 'lucide-react'
import type { Task } from '@/types'

interface TaskCardProps {
  task: Task
  onComplete: (taskId: string) => void
  onDelete: (taskId: string) => void
  disabled?: boolean
}

const points: Record<string, number> = {
  easy: 10,
  medium: 25,
  hard: 50,
}

const difficultyColor: Record<string, string> = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
}

export default function TaskCard({
  task,
  onComplete,
  onDelete,
  disabled,
}: TaskCardProps) {
  if (task.isCompleted) {
    return (
      <Card className="p-4 bg-muted/30 opacity-60">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div className="flex-1 line-through text-muted-foreground">
            {task.title}
          </div>
          <Badge variant="outline" className={difficultyColor[task.difficulty]}>
            +{points[task.difficulty]}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="h-8 w-8 text-destructive hover:text-destructive flex-shrink-0"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-2">
          <p className="font-semibold text-base">{task.title}</p>
          <div className="flex gap-2">
            <Badge variant="outline" className={difficultyColor[task.difficulty]}>
              +{points[task.difficulty]}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onComplete(task.id)}
            disabled={disabled}
            className="h-10 w-10"
            title="Mark complete"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            disabled={disabled}
            className="h-10 w-10 text-destructive hover:text-destructive"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
