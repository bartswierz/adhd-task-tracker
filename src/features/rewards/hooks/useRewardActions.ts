import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { addReward, deleteReward, checkUnlocks } from '@/store/slices/rewardSlice'
import { selectTotalPoints } from '@/store/selectors'
import { toast } from 'sonner'

export default function useRewardActions() {
  const dispatch = useAppDispatch()
  const totalPoints = useAppSelector(selectTotalPoints)

  const handleAddReward = (
    title: string,
    description: string,
    emoji: string,
    pointCost: number
  ) => {
    dispatch(addReward({ title, description, emoji, pointCost }))
    dispatch(checkUnlocks(totalPoints))
    toast.success('Reward added! 🎯')
  }

  const handleDeleteReward = (rewardId: string) => {
    dispatch(deleteReward(rewardId))
    toast.success('Reward removed')
  }

  return { handleAddReward, handleDeleteReward }
}
