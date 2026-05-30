import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface StepNameProps {
  onNext: (name: string) => void
}

export default function StepName({ onNext }: StepNameProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onNext(name.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold">Welcome! 👋</h1>
        <p className="text-muted-foreground">
          Let's get your task tracker set up.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">What's your name?</Label>
        <Input
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          className="text-lg"
        />
      </div>

      <Button
        type="submit"
        disabled={!name.trim()}
        className="w-full"
        size="lg"
      >
        Let's go →
      </Button>
    </form>
  )
}
