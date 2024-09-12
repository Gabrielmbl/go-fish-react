  import { render, screen, cleanup } from '@testing-library/react'
  import { describe, it, expect, vi, afterEach } from 'vitest'
  // import userEvent from '@testing-library/user-event'
  import GameView from '../../components/GameView'

  const mockHumanPlayer = {
    name: () => 'Player 1',
    hand: () => [
      { rank: () => '5', suit: () => 'Hearts' },
      { rank: () => '7', suit: () => 'Diamonds' },
    ],
    books: () => [],
  }

  const mockBotPlayer = {
    name: () => 'Bot 1',
    hand: () => [
      { rank: () => '3', suit: () => 'Clubs' },
      { rank: () => '8', suit: () => 'Spades' },
    ],
    books: () => [],
  }

  const mockGame = {
    players: () => [mockHumanPlayer, mockBotPlayer],
    roundResults: () => [{ displayResult: () => 'Player 1 asked Bot 1 for 9' }],
    isItHumanPlayerTurn: () => true,
  }

  const mockPlayRound = vi.fn()
  const mockNavigateTo = vi.fn()

  describe('GameView', () => {

    afterEach(() => {
      cleanup()
    })

    it('renders players and their hands', () => {
      render(<GameView game={mockGame} playRound={mockPlayRound} navigateTo={mockNavigateTo} />)

      const player1 = screen.queryAllByText(/Player 1/i)
      const player2 = screen.queryAllByText(/Bot 1/i)
      expect(player1.length).toBeGreaterThan(0)
      expect(player2.length).toBeGreaterThan(0)

      expect(screen.getAllByText('5 of Hearts').length).toBeGreaterThan(0)
      expect(screen.getAllByText('7 of Diamonds').length).toBeGreaterThan(0)
      expect(screen.getAllByText('3 of Clubs').length).toBeGreaterThan(0)
      expect(screen.getAllByText('8 of Spades').length).toBeGreaterThan(0)
    })

    it('renders round results', () => {
      render(<GameView game={mockGame} playRound={mockPlayRound} navigateTo={mockNavigateTo} />)
      
      expect(screen.getByText('Player 1 asked Bot 1 for 9')).toBeInTheDocument()
    })

    it('renders ask form when it is the human player\'s turn', () => {
      render(<GameView game={mockGame} playRound={mockPlayRound} navigateTo={mockNavigateTo} />)

      expect(screen.getByLabelText('Ask for rank:')).toBeInTheDocument()
      expect(screen.getByLabelText('Opponent:')).toBeInTheDocument()
    })

    // TODO: Ask about this

    // it('handles form submission', async () => {
    //   render(<GameView game={mockGame} playRound={mockPlayRound} navigateTo={mockNavigateTo} />)
    //   userEvent.selectOptions(screen.getByTestId('ask-rank'), ['5'])
    //   userEvent.selectOptions(screen.getByTestId('ask-opponent'), ['Bot 1'])

    //   userEvent.click(screen.getByTestId('ask-button'))

    //   // expect(mockPlayRound).toHaveBeenCalledWith('Bot 1', '5')
    //   expect(mockPlayRound).toHaveBeenCalled()
    // })
  })
