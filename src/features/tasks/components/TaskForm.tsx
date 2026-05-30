import { useState } from 'react'
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
import type { Difficulty } from '@/types'

interface TaskFormProps {
  onSubmit: (title: string, difficulty: Difficulty) => void
  isLoading?: boolean
}

export default function TaskForm({ onSubmit, isLoading }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit(title.trim(), difficulty)
      setTitle('')
      setDifficulty('medium')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="task-title">Task</Label>
        <Input
          id="task-title"
          placeholder="What do you want to accomplish?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="difficulty">Difficulty</Label>
        <Select
          value={difficulty}
          onValueChange={(v: string) => setDifficulty(v as Difficulty)}
          disabled={isLoading}
        >
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

      <Button
        type="submit"
        disabled={!title.trim() || isLoading}
        className="w-full"
      >
        {isLoading ? 'Adding...' : 'Add Task'}
      </Button>
    </form>
  )
}
