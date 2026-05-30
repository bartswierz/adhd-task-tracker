import LayoutShell from '@/components/LayoutShell'
import RewardCatalog from '@/features/rewards/components/RewardCatalog'
import GoalProgressBar from '@/features/rewards/components/GoalProgressBar'
import PointsBadge from '@/features/rewards/components/PointsBadge'
import { useAppSelector } from '@/hooks/useAppSelector'
import { selectCurrentGoalReward, selectTotalPoints } from '@/store/selectors'

export default function RewardsPage() {
  const totalPoints = useAppSelector(selectTotalPoints)
  const currentGoal = useAppSelector(selectCurrentGoalReward)

  return (
    <LayoutShell>
      <div className="space-y-6 px-4 pb-20">
        <div className="pt-6 space-y-4">
          <PointsBadge points={totalPoints} />

          {currentGoal && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Working toward:</p>
              <p className="text-lg font-semibold">
                {currentGoal.emoji} {currentGoal.title}
              </p>
              <GoalProgressBar />
            </div>
          )}

          {!currentGoal && (
            <p className="text-sm text-muted-foreground">
              Pick a reward goal below to get started!
            </p>
          )}
        </div>

        <RewardCatalog />
      </div>
    </LayoutShell>
  )
}
