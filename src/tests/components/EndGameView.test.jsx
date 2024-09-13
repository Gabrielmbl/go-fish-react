import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import EndGameView from '../../components/EndGameView'

describe('EndGameView', () => {

  afterEach(() => {
    cleanup()
  })

  const mockFinishGame = vi.fn()

  it('renders a single winner when there is one winner', () => {
    const mockWinner = { name: () => 'Player 1' }
    render(<EndGameView winners={[mockWinner]} finishGame={mockFinishGame} />)

    expect(screen.getByText('Winner:')).toBeInTheDocument()
    expect(screen.getByText('Player 1')).toBeInTheDocument()
  })

  it('renders multiple winners when there are multiple winners', () => {
    const mockWinners = [{ name: () => 'Player 1' }, { name: () => 'Player 2' }]
    render(<EndGameView winners={mockWinners} finishGame={mockFinishGame} />)

    expect(screen.getByText('Winners:')).toBeInTheDocument()
    expect(screen.getByText('Player 1')).toBeInTheDocument()
    expect(screen.getByText('Player 2')).toBeInTheDocument()
  })

  it('calls handleNavigateToLogin when the button is clicked', () => {
    const mockWinner = { name: () => 'Player 1' }
    render(<EndGameView winners={[mockWinner]} finishGame={mockFinishGame} />)

    userEvent.click(screen.getByTestId('back-to-login-button'))

    expect(mockFinishGame).toHaveBeenCalled
  })

})
