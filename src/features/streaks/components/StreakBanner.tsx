import { useAppSelector } from '@/hooks/useAppSelector'
import { selectCurrentStreak, selectTotalPoints, selectGoalProgress, selectCurrentGoalReward } from '@/store/selectors'
import { Progress } from '@/components/ui/progress'

export default function StreakBanner() {
  const streak = useAppSelector(selectCurrentStreak)
  const points = useAppSelector(selectTotalPoints)
  const progress = useAppSelector(selectGoalProgress)
  const goal = useAppSelector(selectCurrentGoalReward)

  return (
    <div className="px-4 pt-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-2xl font-bold">
            🔥 {streak} {streak === 1 ? 'day' : 'days'}
          </p>
          <p className="text-sm text-muted-foreground">Keep it up!</p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-2xl font-bold">
            ⭐ {points}
          </p>
          <p className="text-sm text-muted-foreground">Points</p>
        </div>
      </div>

      {goal && (
        <div className="space-y-2 pt-2">
          <p className="text-sm font-medium text-muted-foreground">
            {progress.percent}% to {goal.emoji} {goal.title}
          </p>
          <Progress value={progress.percent} />
        </div>
      )}
    </div>
  )
}
