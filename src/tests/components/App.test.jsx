import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import { describe, it, expect, afterEach, vi } from 'vitest'
import { describe, it, expect, afterEach } from 'vitest'
import App from '../../App'

describe('App', () => {

  afterEach(() => {
    cleanup()
  })

  // const mockPlayRound = vi.fn()

  it('renders LoginView initially', () => {
    render(<App />)
    expect(screen.getByLabelText('Your name')).toBeInTheDocument()
    expect(screen.getByLabelText('Number of Opponents')).toBeInTheDocument()
  })

  it('navigates to GameView after setting player info', async () => {
    render(<App />)

    await userEvent.type(screen.getByLabelText(/your name/i), 'Gabriel')
    await userEvent.type(screen.getByLabelText(/number of opponents/i), '2')
    await userEvent.click(screen.getByText(/start game/i))

    const gameView = screen.getByTestId('game-view')
    expect(gameView).toBeInTheDocument()
  })


  // // TODO: Ask about what's not working with this mockPlayRound
  // it('calls playRound when a round is played', async () => {
  //   render(<App playRound={mockPlayRound} />)
  
  //   // Simulate entering player name and starting the game
  //   await userEvent.type(screen.getByLabelText(/your name/i), 'Gabriel')
  //   await userEvent.type(screen.getByLabelText(/number of opponents/i), '2')
  //   await userEvent.click(screen.getByText(/start game/i))
  
  //   const gameView = screen.getByTestId('game-view')
  //   expect(gameView).toBeInTheDocument()
  
  //   // Simulate playing a round
  //   const playRoundButton = screen.getByTestId('ask-button')
  //   await userEvent.click(playRoundButton)
  
  //   // Check if round was played (could spy on playRound method)
  //   // You would mock `playRound` and check it has been called
  //   expect(mockPlayRound).toHaveBeenCalled()
  // })
  

})