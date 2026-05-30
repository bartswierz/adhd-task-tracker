import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RewardsState, Reward } from '@/types'

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const initialState: RewardsState = {
  catalog: [],
  unlockedIds: [],
  selectedGoalId: null,
}

const rewardSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    setGoal: (state, action: PayloadAction<string | null>) => {
      state.selectedGoalId = action.payload
    },
    checkUnlocks: (state, action: PayloadAction<number>) => {
      const totalPoints = action.payload
      state.unlockedIds = state.catalog
        .filter((reward) => reward.pointCost <= totalPoints)
        .map((reward) => reward.id)
    },
    addReward: (state, action: PayloadAction<Omit<Reward, 'id'>>) => {
      const newReward: Reward = {
        id: generateId(),
        ...action.payload,
      }
      state.catalog.push(newReward)
    },
    deleteReward: (state, action: PayloadAction<string>) => {
      const rewardId = action.payload
      state.catalog = state.catalog.filter((r) => r.id !== rewardId)
      state.unlockedIds = state.unlockedIds.filter((id) => id !== rewardId)
      if (state.selectedGoalId === rewardId) {
        state.selectedGoalId = null
      }
    },
  },
})

export const { setGoal, checkUnlocks, addReward, deleteReward } = rewardSlice.actions

export default rewardSlice.reducer
