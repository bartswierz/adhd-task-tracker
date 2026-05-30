import { useAppSelector } from '@/hooks/useAppSelector'
import { selectIncompleteTasks } from '@/store/selectors'
import useTaskActions from '../hooks/useTaskActions'
import TaskCard from './TaskCard'
import EmptyTaskState from './EmptyTaskState'

export default function TaskList() {
  const incompleteTasks = useAppSelector(selectIncompleteTasks)
  const { handleCompleteTask, handleDeleteTask } = useTaskActions()

  if (incompleteTasks.length === 0) {
    return <EmptyTaskState />
  }

  return (
    <div className="space-y-3">
      {incompleteTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
        />
      ))}
    </div>
  )
}
