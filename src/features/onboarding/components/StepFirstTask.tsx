import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { setUserName, completeOnboarding } from '@/store/slices/settingsSlice'
import { setGoal } from '@/store/slices/rewardSlice'
import { addTask } from '@/store/slices/taskSlice'
import type { Difficulty } from '@/types'

interface StepFirstTaskProps {
  userName: string
  selectedGoalId: string
}

export default function StepFirstTask({
  userName,
  selectedGoalId,
}: StepFirstTaskProps) {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    dispatch(setUserName(userName))
    dispatch(setGoal(selectedGoalId))

    if (title.trim()) {
      dispatch(addTask({ title: title.trim(), difficulty }))
    }

    dispatch(completeOnboarding())
  }

  const handleSkip = () => {
    dispatch(setUserName(userName))
    dispatch(setGoal(selectedGoalId))
    dispatch(completeOnboarding())
  }

  return (
    <form onSubmit={handleAddTask} className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold">Add your first task 📝</h2>
        <p className="text-sm text-muted-foreground">
          Pick something small to get started.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Task title</Label>
        <Input
          id="title"
          placeholder="e.g., Take a walk, drink water"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          className="text-base"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="difficulty">Difficulty</Label>
        <Select value={difficulty} onValueChange={(v: string) => setDifficulty(v as Difficulty)}>
          <SelectTrigger id="difficulty">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy (10 pts)</SelectItem>
            <SelectItem value="medium">Medium (25 pts)</SelectItem>
            <SelectItem value="hard">Hard (50 pts)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add task →'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={handleSkip}
          disabled={isSubmitting}
        >
          I'll add one later
        </Button>
      </div>
    </form>
  )
}
