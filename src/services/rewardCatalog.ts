import type { Reward } from '@/types'

export const rewardCatalog: Reward[] = [
  {
    id: 'coffee-break',
    title: 'Coffee Shop Break',
    description: 'Take a break at your favorite spot',
    emoji: '☕',
    pointCost: 50,
  },
  {
    id: 'favorite-snack',
    title: 'Favorite Snack',
    description: 'Treat yourself to something delicious',
    emoji: '🍪',
    pointCost: 100,
  },
  {
    id: 'gaming',
    title: '30 Min Gaming',
    description: 'Time for your favorite game',
    emoji: '🎮',
    pointCost: 150,
  },
  {
    id: 'movie-night',
    title: 'Movie Night',
    description: 'Watch something you love',
    emoji: '🍿',
    pointCost: 300,
  },
  {
    id: 'weekend-outing',
    title: 'Weekend Outing',
    description: 'Plan something fun for the weekend',
    emoji: '🎉',
    pointCost: 500,
  },
  {
    id: 'new-game',
    title: 'New Game Purchase',
    description: 'Buy that game you\'ve been eyeing',
    emoji: '🎯',
    pointCost: 600,
  },
  {
    id: 'day-off',
    title: 'Day Off',
    description: 'Relax without any obligations',
    emoji: '😌',
    pointCost: 1000,
  },
]
