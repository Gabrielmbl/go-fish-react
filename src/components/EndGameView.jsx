import React from 'react'
import PropTypes from 'prop-types'

class EndGameView extends React.Component {
  constructor(props) {
    super(props)
    this.handleNavigateToGame = this.handleNavigateToGame.bind(this)
    this.handleNavigateToLogin = this.handleNavigateToLogin.bind(this)
  }

  static propTypes = {
    navigateTo: PropTypes.func.isRequired
  }

  handleNavigateToGame() {
    this.props.navigateTo('game')
  }

  handleNavigateToLogin() {
    this.props.navigateTo('login')
  }

  render() {
    return (
      <div>
        <h1>End Game View Page</h1>
        <button onClick={this.handleNavigateToLogin}>Back to Login View</button>
        <button onClick={this.handleNavigateToGame}>Back to Game View</button>
      </div>
    )
  }
}

export default EndGameView
