import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import { Navigate } from 'react-router-dom'

class LoginView extends React.Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  
  static propTypes = {
    game: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
  }

  handleFormSubmit(playerName, opponentCount, difficulty) {
    if (playerName === '' || opponentCount < 1 || opponentCount > 8) return
    this.props.onSubmit(playerName, opponentCount, difficulty)
  }

  render() {
    const { game } = this.props

    if (game) {
      return <Navigate to='/game' />
    }

    return (
      <div className="flex justify-center">
        <LoginForm onSubmit={this.handleFormSubmit} />
      </div>
    )
  }
}

export default LoginView
