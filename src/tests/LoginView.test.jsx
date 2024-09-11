import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoginView from '../components/LoginView'

describe('LoginView', () => {
  it('renders correctly', () => {
    const navigateTo = vi.fn()
    render(<LoginView navigateTo={navigateTo} />)

    expect(screen.getByText('Login View Page')).toBeInTheDocument()
    expect(screen.getByLabelText('Your name')).toBeInTheDocument()
    expect(screen.getByLabelText('Number of Opponents')).toBeInTheDocument()
  })

  it('calls navigateTo with "game" when valid input is provided and form is submitted', () => {
    const navigateTo = vi.fn()
    render(<LoginView navigateTo={navigateTo} />)

    fireEvent.change(screen.getByLabelText('Your name'), {
      target: { value: 'Player 1' }
    })
    fireEvent.change(screen.getByLabelText('Number of Opponents'), {
      target: { value: '3' }
    })
    fireEvent.submit(screen.getByRole('form'))

    expect(navigateTo).toHaveBeenCalledWith('game')
  })

  it('does not call navigateTo if playerName is empty or opponentCount is invalid', () => {
    const navigateTo = vi.fn()
    render(<LoginView navigateTo={navigateTo} />)

    fireEvent.change(screen.getByLabelText('Number of Opponents'), {
      target: { value: '3' }
    })
    fireEvent.submit(screen.getByRole('form'))
    expect(navigateTo).not.toHaveBeenCalled()

    fireEvent.change(screen.getByLabelText('Your name'), {
      target: { value: 'gabriel' }
    })
    fireEvent.change(screen.getByLabelText('Number of Opponents'), {
      target: { value: '9' } 
    })
    fireEvent.submit(screen.getByRole('form'))
    expect(navigateTo).not.toHaveBeenCalled()
  })
})
