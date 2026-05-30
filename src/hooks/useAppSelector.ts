import { useSelector } from 'react-redux'
import type { RootState } from '@/types'

export const useAppSelector = <T,>(selector: (state: RootState) => T): T =>
  useSelector(selector)
