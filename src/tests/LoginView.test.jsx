import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { userEvent } from '@vitest/browser/context'
import LoginView from '../components/LoginView'

describe('LoginView', () => {
  it('renders correctly', () => {
    const navigateTo = vi.fn()
    render(<LoginView navigateTo={navigateTo} />)

    expect(screen.getByText('Login View Page')).toBeInTheDocument()
    expect(screen.getByLabelText('Your name')).toBeInTheDocument()
    expect(screen.getByLabelText('Number of Opponents')).toBeInTheDocument()
  })

  it('calls navigateTo with "game" when valid input is provided and form is submitted', async () => {
    const navigateTo = vi.fn()
    render(<LoginView navigateTo={navigateTo} />)

    await userEvent.type(screen.getByLabelText('Your name'), 'Player 1')
    await userEvent.type(screen.getByLabelText('Number of Opponents'), '3')

    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(navigateTo).toHaveBeenCalledWith('game')
  })

  it('does not call navigateTo if playerName is empty or opponentCount is invalid', async () => {
    const navigateTo = vi.fn()
    render(<LoginView navigateTo={navigateTo} />)

    await userEvent.type(screen.getByLabelText('Number of Opponents'), '3')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(navigateTo).not.toHaveBeenCalled()

    await userEvent.type(screen.getByLabelText('Your name'), 'gabriel')
    await userEvent.clear(screen.getByLabelText('Number of Opponents'))
    await userEvent.type(screen.getByLabelText('Number of Opponents'), '9') 
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(navigateTo).not.toHaveBeenCalled()
  })
})
