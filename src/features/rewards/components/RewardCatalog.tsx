import { useAppDispatch, useAppSelector } from '@/hooks'
import {
  selectRewardCatalog,
  selectUnlockedRewards,
  selectCurrentGoalReward,
} from '@/store/selectors'
import { setGoal } from '@/store/slices/rewardSlice'
import RewardCard from './RewardCard'

export default function RewardCatalog() {
  const dispatch = useAppDispatch()
  const catalog = useAppSelector(selectRewardCatalog)
  const unlockedRewards = useAppSelector(selectUnlockedRewards)
  const currentGoal = useAppSelector(selectCurrentGoalReward)

  const handleSelectGoal = (rewardId: string) => {
    const selectedReward = catalog.find((r) => r.id === rewardId)
    if (selectedReward && unlockedRewards.find((r) => r.id === rewardId)) {
      dispatch(setGoal(rewardId))
    }
  }

  const unlockedIds = unlockedRewards.map((r) => r.id)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase">
          Unlocked Rewards
        </h3>
        <div className="space-y-2">
          {unlockedRewards.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Complete tasks to unlock rewards
            </p>
          ) : (
            unlockedRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                isUnlocked
                isSelected={currentGoal?.id === reward.id}
                onSelect={handleSelectGoal}
              />
            ))
          )}
        </div>
      </div>

      {catalog.length > unlockedRewards.length && (
        <div className="space-y-2 pt-4 border-t">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase">
            Locked Rewards
          </h3>
          <div className="space-y-2">
            {catalog
              .filter((r) => !unlockedIds.includes(r.id))
              .map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  isUnlocked={false}
                  isSelected={false}
                  onSelect={() => {}}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
