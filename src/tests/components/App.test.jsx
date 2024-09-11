import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, afterEach } from 'vitest'
import App from '../../App'

describe('App', () => {

  afterEach(() => {
    cleanup()
  })

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

})