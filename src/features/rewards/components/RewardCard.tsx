import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import type { Reward } from '@/types'

interface RewardCardProps {
  reward: Reward
  isUnlocked: boolean
  isSelected: boolean
  onSelect: (rewardId: string) => void
}

export default function RewardCard({
  reward,
  isUnlocked,
  isSelected,
  onSelect,
}: RewardCardProps) {
  return (
    <Card
      className={`p-4 transition-all cursor-pointer ${
        isUnlocked
          ? isSelected
            ? 'ring-2 ring-primary bg-primary/5'
            : 'hover:shadow-md hover:bg-muted/50'
          : 'opacity-60 bg-muted/30'
      }`}
      onClick={() => onSelect(reward.id)}
    >
      <div className="flex items-start gap-3">
        <div className="text-4xl">{reward.emoji}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold">{reward.title}</p>
              <p className="text-sm text-muted-foreground">
                {reward.description}
              </p>
            </div>
            {isUnlocked && (
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            )}
          </div>
          <div className="mt-3">
            <Badge variant={isUnlocked ? 'default' : 'secondary'}>
              {reward.pointCost} pts
              {isUnlocked && ' ✓'}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  )
}
