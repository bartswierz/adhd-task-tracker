import { useAppSelector } from '@/hooks/useAppSelector'
import { selectGoalProgress } from '@/store/selectors'
import { Progress } from '@/components/ui/progress'

export default function GoalProgressBar() {
  const progress = useAppSelector(selectGoalProgress)

  return (
    <div className="space-y-2">
      <Progress value={progress.percent} />
      <p className="text-xs text-muted-foreground">
        {progress.earned} / {progress.required} points
      </p>
    </div>
  )
}
