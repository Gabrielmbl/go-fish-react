import React from 'react'
import PropTypes from 'prop-types'

class GameView extends React.Component {
  constructor(props) {
    super(props)
    this.handleNavigateToEndGame = this.handleNavigateToEndGame.bind(this)
    this.handleNavigateToLogin = this.handleNavigateToLogin.bind(this)
  }

  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    playerName: PropTypes.string.isRequired,
    opponentCount: PropTypes.number.isRequired,
  }

  handleNavigateToEndGame() {
    this.props.navigateTo('end-game')
  }

  handleNavigateToLogin() {
    this.props.navigateTo('login')
  }

  render() {
    return (
      <div>
        <h1>Game View Page</h1>
        <div>
          <span>Player name: {this.props.playerName}</span><br></br>
          <span>Number of opponents: {this.props.opponentCount}</span>
        </div>
        <button onClick={this.handleNavigateToLogin}>Go to Login View</button>
        <button onClick={this.handleNavigateToEndGame}>Go to End Game View</button>
      </div>
    )
  }
}

export default GameView
