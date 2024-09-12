import React from 'react'
import LoginView from './components/LoginView'
import GameView from './components/GameView'
import EndGameView from './components/EndGameView'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 'login',
      playerName: '',
      opponentCount: 1,
    }
    this.navigateTo = this.navigateTo.bind(this)
    this.handleSetPlayerInfo = this.handleSetPlayerInfo.bind(this)
  }

  navigateTo(view) {
    this.setState({ currentView: view })
  }

  handleSetPlayerInfo(playerName, opponentCount) {
    this.setState({
      playerName,
      opponentCount
    })
  }

  render() {
    const { currentView, playerName, opponentCount } = this.state
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
        viewComponent = <GameView navigateTo={this.navigateTo} playerName={playerName} opponentCount={opponentCount}/>
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
