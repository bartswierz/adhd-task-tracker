import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Task, TasksState, Difficulty } from '@/types'

const initialState: TasksState = {
  items: [],
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{ title: string; difficulty: Difficulty }>
    ) => {
      const newTask: Task = {
        id: generateId(),
        title: action.payload.title,
        difficulty: action.payload.difficulty,
        isCompleted: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      }
      state.items.push(newTask)
    },
    completeTask: (state, action: PayloadAction<string>) => {
      const task = state.items.find((t) => t.id === action.payload)
      if (task) {
        task.isCompleted = true
        task.completedAt = new Date().toISOString()
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },
  },
})

export const { addTask, completeTask, deleteTask } = taskSlice.actions

export default taskSlice.reducer
