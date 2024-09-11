import { cleanup, render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { userEvent } from '@vitest/browser/context'
import LoginForm from '../../components/LoginForm'

describe('LoginForm', () => {
  let onChange

  const defaultProps = {
    playerName: 'Player 1',
    opponentCount: 3,
    onChange: () => {},
  }

  beforeEach(() => {
    onChange = vi.spyOn(defaultProps, 'onChange')
  })

  afterEach(() => {
    cleanup()
    onChange.mockRestore()
  })
    
  const mockRenderLoginForm = () => {
    render(<LoginForm {...defaultProps} />)
  }

  it('renders correctly', () => {
    mockRenderLoginForm()

    const form = screen.getByTestId('login-form')
    expect(form).toBeInTheDocument()
    expect(screen.getByLabelText('Your name')).toBeInTheDocument()
    expect(screen.getByLabelText('Number of Opponents')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Player 1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('3')).toBeInTheDocument()
    expect(screen.getByText('Start Game')).toBeInTheDocument()
  })

  it('calls onChange when playerName is changed', async () => {
    mockRenderLoginForm()

    const nameInput = screen.getByLabelText('Your name')
  
    await userEvent.clear(nameInput)
    await userEvent.type(nameInput, 'New Player')
    
    expect(onChange).toHaveBeenCalled()
  })

})
