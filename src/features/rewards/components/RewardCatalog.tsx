import { Card } from '@/components/ui/card'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
  selectRewardCatalog,
  selectCurrentGoalReward,
} from '@/store/selectors'
import { setGoal } from '@/store/slices/rewardSlice'
import useRewardActions from '../hooks/useRewardActions'
import RewardCard from './RewardCard'

export default function RewardCatalog() {
  const dispatch = useAppDispatch()
  const catalog = useAppSelector(selectRewardCatalog)
  const currentGoal = useAppSelector(selectCurrentGoalReward)
  const { handleDeleteReward } = useRewardActions()

  const totalPoints = useAppSelector((state) => state.streaks.totalPoints)
  const unlockedIds = catalog
    .filter((r) => r.pointCost <= totalPoints)
    .map((r) => r.id)

  const sorted = [...catalog].sort((a, b) => a.pointCost - b.pointCost)

  const handleSelectGoal = (rewardId: string) => {
    if (currentGoal?.id === rewardId) {
      dispatch(setGoal(null))
    } else {
      dispatch(setGoal(rewardId))
    }
  }

  if (catalog.length === 0) {
    return (
      <Card className="p-8 text-center space-y-3 bg-muted/30 border-dashed">
        <p className="text-2xl">🎯</p>
        <p className="font-semibold">No rewards yet</p>
        <p className="text-sm text-muted-foreground">
          Add a reward above to start working toward something!
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {sorted.map((reward) => (
        <RewardCard
          key={reward.id}
          reward={reward}
          isUnlocked={unlockedIds.includes(reward.id)}
          isSelected={currentGoal?.id === reward.id}
          onSelect={handleSelectGoal}
          onDelete={handleDeleteReward}
        />
      ))}
    </div>
  )
}
