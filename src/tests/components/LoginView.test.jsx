import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import LoginView from '../../components/LoginView'

describe('LoginView', () => {
  const mockNavigateTo = vi.fn()
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    render(<LoginView navigateTo={mockNavigateTo} onSubmit={mockOnSubmit} />)
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('renders the form with player name input and opponent count select', () => {
    expect(screen.getByLabelText(/Your name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Number of Opponents/i)).toBeInTheDocument()
    const submitButton = screen.getByRole('button', { name: /Start Game/i })
    expect(submitButton).toBeInTheDocument()
  })

  it('allows input changes and updates form state', async () => {
    const playerNameInput = screen.getByLabelText(/Your name/i)
    const opponentCountSelect = screen.getByLabelText(/Number of Opponents/i)

    await userEvent.type(playerNameInput, 'Gabriel')
    await userEvent.selectOptions(opponentCountSelect, '3')

    expect(playerNameInput.value).toBe('Gabriel')
    expect(opponentCountSelect.value).toBe('3')
  })

  it('submits form and calls onSubmit with correct data', async () => {
    const playerNameInput = screen.getByLabelText(/Your name/i)
    const opponentCountSelect = screen.getByLabelText(/Number of Opponents/i)
    const submitButton = screen.getByRole('button', { name: /Start Game/i })

    await userEvent.type(playerNameInput, 'Gabriel')
    await userEvent.selectOptions(opponentCountSelect, '3')
    await userEvent.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledWith('Gabriel', 3)
    expect(mockNavigateTo).toHaveBeenCalledWith('game')
  })

  it('prevents form submission with invalid data', async () => {
    const playerNameInput = screen.getByLabelText(/Your name/i)
    const submitButton = screen.getByRole('button', { name: /Start Game/i })

    await userEvent.clear(playerNameInput)
    await userEvent.click(submitButton)

    expect(mockOnSubmit).not.toHaveBeenCalled()
    expect(mockNavigateTo).not.toHaveBeenCalled()
  })
})
