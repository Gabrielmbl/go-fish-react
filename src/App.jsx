import React from 'react'
import LoginView from './components/LoginView'
import GameView from './components/GameView'
import EndGameView from './components/EndGameView'
import Game from './models/Game'
import Player from './models/Player'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 'login',
      playerName: '',
      opponentCount: 1,
      game: null,
      winners: [],
    }

    this.handleSetPlayerInfo = this.handleSetPlayerInfo.bind(this)
    this.playRound = this.playRound.bind(this)
    this.endGame = this.endGame.bind(this)
    this.navigateTo = this.navigateTo.bind(this)
  }

  handleSetPlayerInfo(playerName, opponentCount) {
    const player = new Player(playerName)
    const newGame = new Game(player, opponentCount)
    newGame.deal()
    this.setState({
      game: newGame,
      currentView: 'game',
    })
  }

  playRound(opponent, rank) {
    if (this.state.game) {
      this.state.game.playRound(opponent, rank)
      const winners = this.state.game.gameWinners()
      if (winners.length > 0) {
        this.endGame()
      } else {
        this.setState({ game: this.state.game })
      }
    }
  }

  endGame() {
    this.setState({
      winners: this.state.game.gameWinners(),
      currentView: 'end-game',
    })
  }

  navigateTo(view) {
    this.setState({ currentView: view })
  }

  render() {
    const { currentView, game, winners } = this.state

    let viewComponent

    switch (currentView) {
      case 'login':
        viewComponent = (
          <LoginView
            onSubmit={this.handleSetPlayerInfo}
            navigateTo={this.navigateTo}
          />
        )
        break
      case 'game':
        viewComponent = (
          <GameView
            game={game}
            playRound={this.playRound}
            navigateTo={this.navigateTo}
          />
        )
        break
      case 'end-game':
        viewComponent = (
          <EndGameView
            winners={winners}
            navigateTo={this.navigateTo}
          />
        )
        break
      default:
        viewComponent = (
          <LoginView
            onSubmit={this.handleSetPlayerInfo}
            navigateTo={this.navigateTo}
          />
        )
        break
    }

    return (
      <div>
        {viewComponent}
      </div>
    )
  }
}

export default App
