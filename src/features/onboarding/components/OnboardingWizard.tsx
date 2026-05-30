import { useState } from 'react'
import StepName from './StepName'
import StepGoal from './StepGoal'
import StepFirstTask from './StepFirstTask'

type Step = 'name' | 'goal' | 'task'

export default function OnboardingWizard() {
  const [step, setStep] = useState<Step>('name')
  const [userName, setUserName] = useState('')
  const [selectedGoal, setSelectedGoal] = useState('')

  const handleNameNext = (name: string) => {
    setUserName(name)
    setStep('goal')
  }

  const handleGoalNext = (goalId: string) => {
    setSelectedGoal(goalId)
    setStep('task')
  }

  return (
    <div>
      {step === 'name' && <StepName onNext={handleNameNext} />}
      {step === 'goal' && <StepGoal onNext={handleGoalNext} />}
      {step === 'task' && (
        <StepFirstTask
          userName={userName}
          selectedGoalId={selectedGoal}
        />
      )}
    </div>
  )
}
