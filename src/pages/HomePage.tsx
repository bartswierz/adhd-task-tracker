import { useState } from 'react'
import LayoutShell from '@/components/LayoutShell'
import StreakBanner from '@/features/streaks/components/StreakBanner'
import TaskList from '@/features/tasks/components/TaskList'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import TaskFormSheet from '@/features/tasks/components/TaskFormSheet'

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <LayoutShell>
      <div className="space-y-6">
        <StreakBanner />

        <div className="px-4 flex gap-2">
          <Button
            onClick={() => setIsFormOpen(true)}
            className="flex-1 gap-2"
            size="lg"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </Button>
        </div>

        <div className="px-4 pb-20">
          <TaskList />
        </div>
      </div>

      <TaskFormSheet open={isFormOpen} onOpenChange={setIsFormOpen} />
    </LayoutShell>
  )
}
