import type { RootState } from '@/types'

export const selectIncompleteTasks = (state: RootState) =>
  state.tasks.items.filter((task) => !task.isCompleted)

export const selectCompletedTasks = (state: RootState) =>
  state.tasks.items.filter((task) => task.isCompleted)

export const selectAllTasks = (state: RootState) => state.tasks.items

export const selectTotalPoints = (state: RootState) => state.streaks.totalPoints

export const selectCurrentStreak = (state: RootState) => state.streaks.currentStreak

export const selectLongestStreak = (state: RootState) => state.streaks.longestStreak

export const selectRewardCatalog = (state: RootState) => state.rewards.catalog

export const selectUnlockedRewards = (state: RootState) => {
  const { catalog, unlockedIds } = state.rewards
  return catalog.filter((reward) => unlockedIds.includes(reward.id))
}

export const selectLockedRewards = (state: RootState) => {
  const { catalog, unlockedIds } = state.rewards
  return catalog.filter((reward) => !unlockedIds.includes(reward.id))
}

export const selectCurrentGoalReward = (state: RootState) => {
  const { catalog, selectedGoalId } = state.rewards
  if (!selectedGoalId) return null
  return catalog.find((reward) => reward.id === selectedGoalId) || null
}

export const selectGoalProgress = (state: RootState) => {
  const goalReward = selectCurrentGoalReward(state)
  const totalPoints = selectTotalPoints(state)

  if (!goalReward) {
    return { earned: 0, required: 0, percent: 0 }
  }

  const earned = Math.min(totalPoints, goalReward.pointCost)
  const percent = Math.round((earned / goalReward.pointCost) * 100)

  return {
    earned,
    required: goalReward.pointCost,
    percent,
  }
}

export const selectIsGoalUnlocked = (state: RootState) => {
  const goalReward = selectCurrentGoalReward(state)
  if (!goalReward) return false
  return state.rewards.unlockedIds.includes(goalReward.id)
}

export const selectUserName = (state: RootState) => state.settings.userName

export const selectHasCompletedOnboarding = (state: RootState) =>
  state.settings.hasCompletedOnboarding

export const selectAffirmationsEnabled = (state: RootState) =>
  state.settings.affirmationsEnabled

export const selectIsDarkMode = (state: RootState) => state.settings.isDarkMode
