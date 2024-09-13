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

    this.handleSetGameInfo = this.handleSetGameInfo.bind(this)
    this.playRound = this.playRound.bind(this)
    this.endGame = this.endGame.bind(this)
    this.navigateTo = this.navigateTo.bind(this)
  }

  handleSetGameInfo(playerName, opponentCount, difficulty) {
    const player = new Player(playerName)
    const newGame = new Game(player, opponentCount, difficulty)
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

  renderHeader() {
    return (
      <div className="app__header">
        <div className="navbar">
          <nav className="navbar__content navbar__content--justify-start">
            <span>Go Fish</span>
          </nav>
        </div>
      </div>
    )
  }

  render() {
    const { currentView, game, winners } = this.state

    let viewComponent

    switch (currentView) {
      case 'login':
        viewComponent = (
          <>
            {this.renderHeader()}
            <div className="flex flex-col justify-center full-height transform-y-15">
              <LoginView
                onSubmit={this.handleSetGameInfo}
                navigateTo={this.navigateTo}
              />
            </div>
          </>
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
          <>
            {this.renderHeader()}
            <div className="flex justify-center full-height">
              <EndGameView
                winners={winners}
                navigateTo={this.navigateTo}
              />
            </div>
          </>
        )
        break
      default:
        viewComponent = (
          <>
            {this.renderHeader()}
            <div className="flex flex-col justify-center full-height  transform-y-15">
              <LoginView
                onSubmit={this.handleSetGameInfo}
                navigateTo={this.navigateTo}
              />
            </div>
          </>
        )
        break
    }

    return (
      <>
        {viewComponent}
      </>
    )
  }
}

export default App
