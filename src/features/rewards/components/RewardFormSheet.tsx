import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import RewardForm from './RewardForm'
import useRewardActions from '../hooks/useRewardActions'

interface RewardFormSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function RewardFormSheet({ open, onOpenChange }: RewardFormSheetProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { handleAddReward } = useRewardActions()

  const handleSubmit = (
    title: string,
    description: string,
    emoji: string,
    pointCost: number
  ) => {
    setIsLoading(true)
    handleAddReward(title, description, emoji, pointCost)
    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-lg max-h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add a reward</SheetTitle>
          <SheetDescription>
            What will you treat yourself to when you earn enough points?
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <RewardForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
