import { useAppDispatch, useAppSelector } from '@/hooks'
import { completeTask, deleteTask, addTask } from '@/store/slices/taskSlice'
import { addPoints, updateStreak } from '@/store/slices/streakSlice'
import { checkUnlocks } from '@/store/slices/rewardSlice'
import { selectTotalPoints } from '@/store/selectors'
import { store } from '@/store/store'
import { fireTaskConfetti, fireRewardConfetti } from '@/lib/confetti'
import { toast } from 'sonner'
import type { Difficulty } from '@/types'

const pointsByDifficulty: Record<string, number> = {
  easy: 10,
  medium: 25,
  hard: 50,
}

export default function useTaskActions() {
  const dispatch = useAppDispatch()
  const totalPoints = useAppSelector(selectTotalPoints)

  const handleCompleteTask = (taskId: string) => {
    const unlockedBefore = store.getState().rewards.unlockedIds

    const task = store.getState().tasks.items.find((t) => t.id === taskId)
    const pointsEarned = task ? (pointsByDifficulty[task.difficulty] ?? 25) : 25

    dispatch(completeTask(taskId))
    dispatch(addPoints(pointsEarned))
    dispatch(updateStreak())

    const newTotal = totalPoints + pointsEarned
    dispatch(checkUnlocks(newTotal))

    const unlockedAfter = store.getState().rewards.unlockedIds
    const hasNewUnlock = unlockedAfter.some((id) => !unlockedBefore.includes(id))

    fireTaskConfetti()

    if (hasNewUnlock) {
      setTimeout(() => fireRewardConfetti(), 600)
      toast.success(`Reward unlocked! 🏆 +${pointsEarned} pts`)
    } else {
      toast.success(`Well done! +${pointsEarned} pts 🎉`)
    }
  }

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId))
    toast.success('Task deleted')
  }

  const handleAddTask = (title: string, difficulty: Difficulty) => {
    dispatch(addTask({ title, difficulty }))
    toast.success('Task added! Get it done 💪')
  }

  return {
    handleCompleteTask,
    handleDeleteTask,
    handleAddTask,
  }
}
