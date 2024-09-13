import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginView from './components/LoginView'
import GameView from './components/GameView'
import EndGameView from './components/EndGameView'
import Game from './models/Game'
import Player from './models/Player'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerName: '',
      opponentCount: 1,
      game: null,
      winners: [],
    }

    this.handleSetGameInfo = this.handleSetGameInfo.bind(this)
    this.playRound = this.playRound.bind(this)
    this.endGame = this.endGame.bind(this)
    this.finishGame = this.finishGame.bind(this)
  }

  handleSetGameInfo(playerName, opponentCount, difficulty) {
    const player = new Player(playerName)
    const newGame = new Game(player, opponentCount, difficulty)
    newGame.deal()
    this.setState({
      game: newGame,
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
    })
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

  finishGame() {
    this.setState({game: null})
  }

  render() {
    const { game, winners } = this.state

    return (
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col justify-center full-height transform-y-15">
              <LoginView onSubmit={this.handleSetGameInfo} game={game}/>
            </div>
          }
        />
        <Route
          path="/game"
          element={
            <GameView game={game} playRound={this.playRound} />
          }
        />
        <Route
          path="/end-game"
          element={
            game ? (
              <div className="flex justify-center full-height">
                <EndGameView winners={winners} finishGame={this.finishGame} />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    )
  }
}

export default App
