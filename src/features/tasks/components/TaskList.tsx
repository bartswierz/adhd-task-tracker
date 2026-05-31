import { useAppSelector } from '@/hooks/useAppSelector'
import { selectIncompleteTasks, selectCompletedTasks } from '@/store/selectors'
import useTaskActions from '../hooks/useTaskActions'
import TaskCard from './TaskCard'
import EmptyTaskState from './EmptyTaskState'

export default function TaskList() {
  const incompleteTasks = useAppSelector(selectIncompleteTasks)
  const completedTasks = useAppSelector(selectCompletedTasks)
  const { handleCompleteTask, handleDeleteTask } = useTaskActions()

  if (incompleteTasks.length === 0 && completedTasks.length === 0) {
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

      {completedTasks.length > 0 && (
        <>
          {incompleteTasks.length > 0 && (
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide pt-2">
              Completed
            </p>
          )}
          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </>
      )}
    </div>
  )
}
