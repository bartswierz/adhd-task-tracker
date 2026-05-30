import OnboardingWizard from '@/features/onboarding/components/OnboardingWizard'

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <OnboardingWizard />
      </div>
    </div>
  )
}
