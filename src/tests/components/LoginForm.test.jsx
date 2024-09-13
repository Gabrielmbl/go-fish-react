import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import LoginForm from '../../components/LoginForm'

describe('LoginForm', () => {
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    render(<LoginForm onSubmit={mockOnSubmit} />)
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('calls onSubmit with playerName and opponentCount when the form is submitted', async () => {
    const playerNameInput = screen.getByLabelText(/Your name/i)
    const opponentCountSelect = screen.getByLabelText(/Number of Opponents/i)
    const difficultySelect = screen.getByLabelText(/Difficulty/i)
    const submitButton = screen.getByRole('button', { name: /Start Game/i })

    await userEvent.type(playerNameInput, 'Gabriel')
    await userEvent.selectOptions(opponentCountSelect, '3')
    await userEvent.selectOptions(difficultySelect, 'medium')

    await userEvent.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledWith('Gabriel', 3, 'medium')
  })
})
