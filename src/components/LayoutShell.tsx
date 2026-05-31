import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LayoutShellProps {
  children: React.ReactNode
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const isHome = location.pathname === '/'
  const isRewards = location.pathname === '/rewards'

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 overflow-auto">{children}</main>

      {(isHome || isRewards) && (
        <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex justify-around">
            <Button
              variant={isHome ? 'default' : 'ghost'}
              className="flex-1 gap-2 rounded-none border-none h-16"
              onClick={() => navigate('/')}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Button>
            <Button
              variant={isRewards ? 'default' : 'ghost'}
              className="flex-1 gap-2 rounded-none border-none h-16"
              onClick={() => navigate('/rewards')}
            >
              <Gift className="w-5 h-5" />
              <span className="hidden sm:inline">Rewards</span>
            </Button>
          </div>
        </nav>
      )}
    </div>
  )
}
