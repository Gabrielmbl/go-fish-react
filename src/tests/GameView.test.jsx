import { describe, it, expect, vi, render, screen } from 'vitest'
import GameView from '../components/GameView'

describe('GameView', () => {
  const defaultProps = {
    playerName: 'Gabriel',
    opponentCount: 3,
    navigateTo: vi.fn(),
  }

  it('renders correctly', () => {
    render(<GameView {...defaultProps} />)

    expect(screen.getByText('Game View Page')).toBeInTheDocument()
    expect(screen.getByText('Gabriel')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})