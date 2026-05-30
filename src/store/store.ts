import { configureStore } from '@reduxjs/toolkit'
import type { RootState } from '@/types'
import tasksReducer from './slices/taskSlice'
import rewardsReducer from './slices/rewardSlice'
import streaksReducer from './slices/streakSlice'
import settingsReducer from './slices/settingsSlice'
import { loadState, saveState } from '@/services/persistenceService'

const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    rewards: rewardsReducer,
    streaks: streaksReducer,
    settings: settingsReducer,
  },
  preloadedState: preloadedState as RootState | undefined,
})

let saveTimeout: ReturnType<typeof setTimeout>
store.subscribe(() => {
  clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    saveState(store.getState() as RootState)
  }, 300)
})

export type AppDispatch = typeof store.dispatch
