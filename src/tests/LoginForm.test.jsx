import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
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

  it('calls onChange when playerName is changed', () => {
    render(<LoginForm {...defaultProps} />)

    fireEvent.change(screen.getByLabelText('Your name'), {
      target: { value: 'New Player' },
    })

    expect(onChange).toHaveBeenCalledWith('playerName', 'New Player')
  })

  it('calls onChange when opponentCount is changed', () => {
    render(<LoginForm {...defaultProps} />)

    fireEvent.change(screen.getByLabelText('Number of Opponents'), {
      target: { value: '5' },
    })

    expect(onChange).toHaveBeenCalledWith('opponentCount', '5')
  })

  it('calls onSubmit when the form is submitted', () => {
    render(<LoginForm {...defaultProps} />)

    fireEvent.submit(screen.getByRole('form'))

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('does not call onSubmit if form is incomplete', () => {
    render(<LoginForm {...defaultProps} playerName="" />)

    fireEvent.submit(screen.getByRole('form'))

    expect(onSubmit).not.toHaveBeenCalled()
  })
})
