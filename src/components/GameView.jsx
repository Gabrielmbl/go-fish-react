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
      <div className="game-view" data-testid="game-view">
        <div className="game-board" data-testid="game-board">
          <h1>Game View Page</h1>
        </div>
        <div className="game-feed" data-testid="game-feed">
          <span>Player name: {this.props.playerName}</span><br></br>
          <span>Number of opponents: {this.props.opponentCount}</span>
        </div>
        <div className="player-hand" data-testid="player-hand">
          <button onClick={this.handleNavigateToLogin}>Go to Login View</button>
        </div>
        <div className="player-books" data-testid="player-books">
          <button onClick={this.handleNavigateToEndGame}>Go to End Game View</button>
        </div>
      </div>
    )
  }
}

export default GameView
