import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Trash2 } from 'lucide-react'
import type { Reward } from '@/types'

interface RewardCardProps {
  reward: Reward
  isUnlocked: boolean
  isSelected: boolean
  onSelect: (rewardId: string) => void
  onDelete: (rewardId: string) => void
}

export default function RewardCard({
  reward,
  isUnlocked,
  isSelected,
  onSelect,
  onDelete,
}: RewardCardProps) {
  return (
    <Card
      className={`p-4 transition-all cursor-pointer ${
        isSelected
          ? 'ring-2 ring-primary bg-primary/5'
          : isUnlocked
            ? 'hover:shadow-md hover:bg-muted/50'
            : 'opacity-60 bg-muted/30'
      }`}
      onClick={() => isUnlocked && onSelect(reward.id)}
    >
      <div className="flex items-start gap-3">
        <div className="text-4xl flex-shrink-0">{reward.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-semibold truncate">{reward.title}</p>
              {reward.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {reward.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {isUnlocked && (
                <Check className="w-4 h-4 text-green-600" />
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(reward.id)
                }}
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                title="Delete reward"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <Badge variant={isUnlocked ? 'default' : 'secondary'}>
              {reward.pointCost} pts{isUnlocked ? ' ✓' : ''}
            </Badge>
            {isSelected && (
              <Badge variant="outline" className="ml-2 text-primary border-primary">
                Goal
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
