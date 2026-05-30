import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAppSelector } from '@/hooks/useAppSelector'
import { selectRewardCatalog } from '@/store/selectors'
import RewardForm from '@/features/rewards/components/RewardForm'
import useRewardActions from '@/features/rewards/hooks/useRewardActions'

interface StepGoalProps {
  onNext: (goalId: string) => void
}

export default function StepGoal({ onNext }: StepGoalProps) {
  const [selected, setSelected] = useState('')
  const rewards = useAppSelector(selectRewardCatalog)
  const { handleAddReward } = useRewardActions()

  const handleFormSubmit = (
    title: string,
    description: string,
    emoji: string,
    pointCost: number
  ) => {
    handleAddReward(title, description, emoji, pointCost)
    // Redux update triggers re-render — catalog now has a reward,
    // so the component switches to the selection view automatically.
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(selected)
  }

  if (rewards.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">What are you working toward? 🎯</h2>
          <p className="text-sm text-muted-foreground">
            Add your first reward to get started.
          </p>
        </div>

        <RewardForm onSubmit={handleFormSubmit} />

        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={() => onNext('')}
        >
          Skip for now
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
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
                {reward.description && (
                  <p className="text-sm text-muted-foreground">
                    {reward.description}
                  </p>
                )}
                <p className="text-xs text-primary font-medium mt-1">
                  {reward.pointCost} points
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <Button
          type="submit"
          disabled={!selected}
          className="w-full"
          size="lg"
        >
          Start earning →
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={() => onNext('')}
        >
          Skip for now
        </Button>
      </div>
    </form>
  )
}
