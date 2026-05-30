import { useState } from 'react'
import { Plus } from 'lucide-react'
import LayoutShell from '@/components/LayoutShell'
import RewardCatalog from '@/features/rewards/components/RewardCatalog'
import GoalProgressBar from '@/features/rewards/components/GoalProgressBar'
import PointsBadge from '@/features/rewards/components/PointsBadge'
import RewardFormSheet from '@/features/rewards/components/RewardFormSheet'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/hooks/useAppSelector'
import { selectCurrentGoalReward, selectTotalPoints } from '@/store/selectors'

export default function RewardsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
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
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setIsFormOpen(true)}
            className="flex-1 gap-2"
            size="lg"
          >
            <Plus className="w-5 h-5" />
            Add Reward
          </Button>
        </div>

        <RewardCatalog />
      </div>

      <RewardFormSheet open={isFormOpen} onOpenChange={setIsFormOpen} />
    </LayoutShell>
  )
}
