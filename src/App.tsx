import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { Toaster } from 'sonner'
import { store } from '@/store/store'
import { checkAndResetStreak } from '@/store/slices/streakSlice'
import { initCatalog } from '@/store/slices/rewardSlice'
import { rewardCatalog } from '@/services/rewardCatalog'
import { selectHasCompletedOnboarding } from '@/store/selectors'
import OnboardingPage from '@/pages/OnboardingPage'
import HomePage from '@/pages/HomePage'
import RewardsPage from '@/pages/RewardsPage'
import { useAppSelector } from '@/hooks/useAppSelector'

function AppContent() {
  const dispatch = useDispatch()
  const hasCompletedOnboarding = useAppSelector(selectHasCompletedOnboarding)

  useEffect(() => {
    dispatch(initCatalog(rewardCatalog))
    dispatch(checkAndResetStreak())
  }, [dispatch])

  if (!hasCompletedOnboarding) {
    return (
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/rewards" element={<RewardsPage />} />
      <Route path="/onboarding" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
        <Toaster position="bottom-center" />
      </Router>
    </Provider>
  )
}
