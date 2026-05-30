import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RewardsState, Reward } from '@/types'

const initialState: RewardsState = {
  catalog: [],
  unlockedIds: [],
  selectedGoalId: null,
}

const rewardSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    initCatalog: (state, action: PayloadAction<Reward[]>) => {
      state.catalog = action.payload
    },
    setGoal: (state, action: PayloadAction<string | null>) => {
      state.selectedGoalId = action.payload
    },
    checkUnlocks: (state, action: PayloadAction<number>) => {
      const totalPoints = action.payload
      state.unlockedIds = state.catalog
        .filter((reward) => reward.pointCost <= totalPoints)
        .map((reward) => reward.id)
    },
  },
})

export const { initCatalog, setGoal, checkUnlocks } = rewardSlice.actions

export default rewardSlice.reducer
