export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Task {
  id: string
  title: string
  difficulty: Difficulty
  isCompleted: boolean
  createdAt: string
  completedAt: string | null
}

export interface Reward {
  id: string
  title: string
  description: string
  emoji: string
  pointCost: number
}

export interface TasksState {
  items: Task[]
}

export interface RewardsState {
  catalog: Reward[]
  unlockedIds: string[]
  selectedGoalId: string | null
}

export interface StreakState {
  currentStreak: number
  longestStreak: number
  lastCompletedDate: string | null
  totalPoints: number
  lastTaskCompletedAt: string | null
}

export interface SettingsState {
  userName: string
  hasCompletedOnboarding: boolean
  affirmationsEnabled: boolean
  lastAffirmationShownAt: string | null
}

export interface RootState {
  tasks: TasksState
  rewards: RewardsState
  streaks: StreakState
  settings: SettingsState
}
