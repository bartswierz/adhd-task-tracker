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
  const [pointCost, setPointCost] = useState<number>(10)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit(title.trim(), description.trim(), emoji, pointCost)
      setTitle('')
      setDescription('')
      setEmoji('🎯')
      setPointCost(10)
    }
  }

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
        <Select
          value={String(pointCost)}
          onValueChange={(v: string) => setPointCost(Number(v))}
          disabled={isLoading}
        >
          <SelectTrigger id="reward-points">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 pts (Easy)</SelectItem>
            <SelectItem value="25">25 pts (Medium)</SelectItem>
            <SelectItem value="50">50 pts (Hard)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={!title.trim() || isLoading}
        className="w-full"
      >
        {isLoading ? 'Adding...' : 'Add Reward'}
      </Button>
    </form>
  )
}
