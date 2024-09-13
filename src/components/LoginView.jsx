import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'

class LoginView extends React.Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  handleFormSubmit(playerName, opponentCount, difficulty) {
    if (playerName === '' || opponentCount < 1 || opponentCount > 8) return
    this.props.onSubmit(playerName, opponentCount, difficulty)
    this.props.navigateTo('game')
  }

  render() {
    return (
      <div className="flex justify-center">
        <LoginForm onSubmit={this.handleFormSubmit} />
      </div>
    )
  }
}

export default LoginView
