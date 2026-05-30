import confetti from 'canvas-confetti'

export const fireTaskConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.75 },
  })
}

export const fireRewardConfetti = () => {
  confetti({
    particleCount: 120,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.6 },
  })
  confetti({
    particleCount: 120,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.6 },
  })
}
