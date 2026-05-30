import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAppSelector } from '@/hooks/useAppSelector'
import { selectRewardCatalog } from '@/store/selectors'

interface StepGoalProps {
  onNext: (goalId: string) => void
}

export default function StepGoal({ onNext }: StepGoalProps) {
  const [selected, setSelected] = useState('')
  const rewards = useAppSelector(selectRewardCatalog)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selected) {
      onNext(selected)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold">What are you working toward? 🎯</h2>
        <p className="text-sm text-muted-foreground">
          Pick a reward to keep you motivated.
        </p>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {rewards.map((reward) => (
          <Card
            key={reward.id}
            className={`p-4 cursor-pointer transition-all ${
              selected === reward.id
                ? 'ring-2 ring-primary bg-primary/5'
                : 'hover:bg-muted/50'
            }`}
            onClick={() => setSelected(reward.id)}
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">{reward.emoji}</div>
              <div className="flex-1">
                <p className="font-semibold">{reward.title}</p>
                <p className="text-sm text-muted-foreground">
                  {reward.description}
                </p>
                <p className="text-xs text-primary font-medium mt-1">
                  {reward.pointCost} points
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button
        type="submit"
        disabled={!selected}
        className="w-full"
        size="lg"
      >
        Start earning →
      </Button>
    </form>
  )
}
