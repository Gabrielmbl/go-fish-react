import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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

    expect(screen.getByText((content) => content.includes('Player name: Gabriel'))).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('Number of opponents: 3'))).toBeInTheDocument()
  })
})
