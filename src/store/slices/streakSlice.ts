import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { StreakState } from '@/types'

const initialState: StreakState = {
  currentStreak: 0,
  longestStreak: 0,
  lastCompletedDate: null,
  totalPoints: 0,
  lastTaskCompletedAt: null,
}

const streakSlice = createSlice({
  name: 'streaks',
  initialState,
  reducers: {
    addPoints: (state, action: PayloadAction<number>) => {
      state.totalPoints += action.payload
      state.lastTaskCompletedAt = new Date().toISOString()
    },
    updateStreak: (state) => {
      const today = new Date().toISOString().split('T')[0]
      if (state.lastCompletedDate !== today) {
        state.currentStreak += 1
        state.lastCompletedDate = today
        if (state.currentStreak > state.longestStreak) {
          state.longestStreak = state.currentStreak
        }
      }
    },
    checkAndResetStreak: (state) => {
      if (!state.lastCompletedDate) return

      const today = new Date().toISOString().split('T')[0]
      const lastDate = new Date(state.lastCompletedDate)
      const todayDate = new Date(today)

      const daysSince = Math.floor(
        (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (daysSince > 1) {
        state.currentStreak = 0
      }
    },
    initializeStreak: (_state, action: PayloadAction<StreakState>) => {
      return action.payload
    },
  },
})

export const { addPoints, updateStreak, checkAndResetStreak, initializeStreak } =
  streakSlice.actions

export default streakSlice.reducer
