import { cleanup, render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { userEvent } from '@vitest/browser/context'
import LoginView from '../../components/LoginView'

describe('LoginView', () => {
  let navigateTo, setPlayerInfo

  const defaultProps = {
    navigateTo: () => {},
    setPlayerInfo: () => {},
  }

  beforeEach(() => {
    navigateTo = vi.spyOn(defaultProps, 'navigateTo')
    setPlayerInfo = vi.spyOn(defaultProps, 'setPlayerInfo')
  })

  afterEach(() => {
    cleanup()
  })

  const mockRenderLoginView = () => {
    render(<LoginView navigateTo={navigateTo} setPlayerInfo={setPlayerInfo} />)
  }

  it('renders correctly', () => {
    mockRenderLoginView()

    expect(screen.getByLabelText('Your name')).toBeInTheDocument()
    expect(screen.getByLabelText('Number of Opponents')).toBeInTheDocument()
  })

  it('calls navigateTo with "game" when valid input is provided and form is submitted', async () => {
    mockRenderLoginView()

    await userEvent.type(screen.getByLabelText('Your name'), 'Player 1')
    await userEvent.selectOptions(screen.getByLabelText('Number of Opponents'), '3')

    await userEvent.click(screen.getByTestId('start-game-button'))

    expect(navigateTo).toHaveBeenCalledWith('game')
  })

  it('does not call navigateTo if playerName is empty or opponentCount is invalid', async () => {
    mockRenderLoginView()

    await userEvent.selectOptions(screen.getByLabelText('Number of Opponents'), '3')
    await userEvent.click(screen.getByTestId('start-game-button'))
    expect(navigateTo).not.toHaveBeenCalled()
  })
})
