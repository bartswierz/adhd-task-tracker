import { useAppDispatch, useAppSelector } from '@/hooks'
import { completeTask, deleteTask, addTask } from '@/store/slices/taskSlice'
import { addPoints, updateStreak } from '@/store/slices/streakSlice'
import { checkUnlocks } from '@/store/slices/rewardSlice'
import { selectTotalPoints } from '@/store/selectors'
import { toast } from 'sonner'
import type { Difficulty } from '@/types'

const points: Record<string, number> = {
  easy: 10,
  medium: 25,
  hard: 50,
}

export default function useTaskActions() {
  const dispatch = useAppDispatch()
  const totalPoints = useAppSelector(selectTotalPoints)

  const handleCompleteTask = (taskId: string) => {
    dispatch(completeTask(taskId))

    const pointsEarned = points.medium

    dispatch(addPoints(pointsEarned))
    dispatch(updateStreak())

    const newTotal = totalPoints + pointsEarned
    dispatch(checkUnlocks(newTotal))

    toast.success(`Well done! +${pointsEarned} pts 🎉`)
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
