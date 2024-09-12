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
    }
    this.navigateTo = this.navigateTo.bind(this)
    this.handleSetPlayerInfo = this.handleSetPlayerInfo.bind(this)
    this.initializeGame = this.initializeGame.bind(this)
  }

  navigateTo(view) {
    this.setState({ currentView: view })
  }

  handleSetPlayerInfo(playerName, opponentCount) {
    this.setState({
      playerName,
      opponentCount
    }, () => {
      this.initializeGame() 
      this.navigateTo('game')
    })
  }

  initializeGame() {
    const { playerName, opponentCount } = this.state
    const playerObject = new Player(playerName)
    const newGame = new Game(playerObject, opponentCount)
    this.setState({ game: newGame })
  }

  render() {
    const { currentView, playerName, opponentCount, game } = this.state
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
            navigateTo={this.navigateTo} 
            playerName={playerName} 
            opponentCount={opponentCount}
            game={game}
          />
        )
        break
      case 'end-game':
        viewComponent = <EndGameView navigateTo={this.navigateTo} />
        break
      default:
        viewComponent = <LoginView navigateTo={this.navigateTo} />
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
