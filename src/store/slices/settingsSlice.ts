import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { SettingsState } from '@/types'

const initialState: SettingsState = {
  userName: '',
  hasCompletedOnboarding: false,
  affirmationsEnabled: false,
  lastAffirmationShownAt: null,
  isDarkMode: true,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
    completeOnboarding: (state) => {
      state.hasCompletedOnboarding = true
    },
    toggleAffirmations: (state) => {
      state.affirmationsEnabled = !state.affirmationsEnabled
    },
    setLastAffirmationShownAt: (state, action: PayloadAction<string>) => {
      state.lastAffirmationShownAt = action.payload
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode
    },
  },
})

export const {
  setUserName,
  completeOnboarding,
  toggleAffirmations,
  setLastAffirmationShownAt,
  toggleDarkMode,
} = settingsSlice.actions

export default settingsSlice.reducer
