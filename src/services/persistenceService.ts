import type { RootState } from '@/types'

const STORAGE_KEY = 'adhd-tracker-v1'

export const loadState = (): Partial<RootState> | undefined => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY)
    if (serialized === null) {
      return undefined
    }
    return JSON.parse(serialized)
  } catch (error) {
    console.error('Failed to load state from localStorage:', error)
    return undefined
  }
}

export const saveState = (state: RootState): void => {
  try {
    const serialized = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serialized)
  } catch (error) {
    console.error('Failed to save state to localStorage:', error)
  }
}
