import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import EndGameView from '../../components/EndGameView'

describe('EndGameView', () => {

  afterEach(() => {
    cleanup()
  })

  const mockNavigateTo = vi.fn()

  it('renders a single winner when there is one winner', () => {
    const mockWinner = { name: () => 'Player 1' }
    render(<EndGameView winners={[mockWinner]} navigateTo={mockNavigateTo} />)

    expect(screen.getByText('Winner:')).toBeInTheDocument()
    expect(screen.getByText('Player 1')).toBeInTheDocument()
  })

  it('renders multiple winners when there are multiple winners', () => {
    const mockWinners = [{ name: () => 'Player 1' }, { name: () => 'Player 2' }]
    render(<EndGameView winners={mockWinners} navigateTo={mockNavigateTo} />)

    expect(screen.getByText('Winners:')).toBeInTheDocument()
    expect(screen.getByText('Player 1')).toBeInTheDocument()
    expect(screen.getByText('Player 2')).toBeInTheDocument()
  })

  it('calls navigateTo("login") when "Back to Login View" button is clicked', async () => {
    const user = userEvent.setup()
    render(<EndGameView winners={[]} navigateTo={mockNavigateTo} />)

    await user.click(screen.getByText('Back to Login View'))

    expect(mockNavigateTo).toHaveBeenCalledWith('login')
  })

  it('calls navigateTo("game") when "Back to Game View" button is clicked', async () => {
    const user = userEvent.setup()
    render(<EndGameView winners={[]} navigateTo={mockNavigateTo} />)

    await user.click(screen.getByText('Back to Game View'))

    expect(mockNavigateTo).toHaveBeenCalledWith('game')
  })
})
