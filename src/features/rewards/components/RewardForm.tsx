import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const EMOJI_OPTIONS = [
  '🎯', '☕', '🍪', '🎮', '🍿', '🎉', '😌', '🍕',
  '🎵', '📚', '🏋️', '🛁', '🎨', '🍦', '🌅', '💆',
  '🛍️', '🎬', '🏖️', '🎶',
]

interface RewardFormProps {
  onSubmit: (title: string, description: string, emoji: string, pointCost: number) => void
  isLoading?: boolean
}

export default function RewardForm({ onSubmit, isLoading }: RewardFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [emoji, setEmoji] = useState('🎯')
  const [pointCost, setPointCost] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cost = parseInt(pointCost, 10)
    if (title.trim() && cost >= 1) {
      onSubmit(title.trim(), description.trim(), emoji, cost)
      setTitle('')
      setDescription('')
      setEmoji('🎯')
      setPointCost('')
    }
  }

  const isValid = title.trim().length > 0 && parseInt(pointCost, 10) >= 1

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reward-title">Reward title</Label>
        <Input
          id="reward-title"
          placeholder="e.g., Coffee break, Movie night"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reward-description">Description (optional)</Label>
        <Input
          id="reward-description"
          placeholder="e.g., Enjoy a hot drink at your favourite spot"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label>Icon</Label>
        <div className="grid grid-cols-10 gap-1">
          {EMOJI_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setEmoji(option)}
              disabled={isLoading}
              className={`text-xl p-1.5 rounded-md transition-all hover:bg-muted ${
                emoji === option
                  ? 'ring-2 ring-primary bg-primary/10'
                  : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reward-points">Points required</Label>
        <Input
          id="reward-points"
          type="number"
          min="1"
          placeholder="e.g., 100"
          value={pointCost}
          onChange={(e) => setPointCost(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full"
      >
        {isLoading ? 'Adding...' : 'Add Reward'}
      </Button>
    </form>
  )
}
