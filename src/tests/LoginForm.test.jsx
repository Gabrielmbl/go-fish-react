import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { userEvent } from '@vitest/browser/context'
import LoginForm from '../components/LoginForm'

describe('LoginForm', () => {
  const onChange = vi.fn()
  const onSubmit = vi.fn()

  const defaultProps = {
    playerName: 'Player 1',
    opponentCount: 3,
    onChange,
    onSubmit,
  }

  beforeEach(() => {
    onChange.mockClear()
    onSubmit.mockClear()
  })

  it('renders correctly', () => {
    render(<LoginForm {...defaultProps} />)

    expect(screen.getByLabelText('Your name')).toBeInTheDocument()
    expect(screen.getByLabelText('Number of Opponents')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Player 1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('3')).toBeInTheDocument()
    expect(screen.getByText('Start Game')).toBeInTheDocument()
  })

  it('calls onChange when playerName is changed', async () => {
    render(<LoginForm {...defaultProps} />)

    await userEvent.type(screen.getByLabelText('Your name'), 'New Player')

    expect(onChange).toHaveBeenCalledWith('playerName', 'New Player')
  })

  it('calls onChange when opponentCount is changed', async () => {
    render(<LoginForm {...defaultProps} />)

    await userEvent.type(screen.getByLabelText('Number of Opponents'), '5')

    expect(onChange).toHaveBeenCalledWith('opponentCount', '5')
  })

  it('calls onSubmit when the form is submitted', async () => {
    render(<LoginForm {...defaultProps} />)

    await userEvent.click(screen.getByRole('button', { name: /Start Game/i }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('does not call onSubmit if form is incomplete', async () => {
    render(<LoginForm {...defaultProps} playerName="" />)

    await userEvent.click(screen.getByRole('button', { name: /Start Game/i }))

    expect(onSubmit).not.toHaveBeenCalled()
  })
})
