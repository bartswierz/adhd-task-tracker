import { Sun, Moon } from 'lucide-react'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { selectCurrentStreak, selectTotalPoints, selectGoalProgress, selectCurrentGoalReward, selectIsDarkMode } from '@/store/selectors'
import { toggleDarkMode } from '@/store/slices/settingsSlice'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

export default function StreakBanner() {
  const dispatch = useAppDispatch()
  const streak = useAppSelector(selectCurrentStreak)
  const points = useAppSelector(selectTotalPoints)
  const progress = useAppSelector(selectGoalProgress)
  const goal = useAppSelector(selectCurrentGoalReward)
  const isDarkMode = useAppSelector(selectIsDarkMode)

  return (
    <div className="px-4 pt-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">
              🔥 {streak} {streak === 1 ? 'day' : 'days'}
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleDarkMode())}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
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
