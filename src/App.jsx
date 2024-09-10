import React from 'react'
import LoginView from './components/LoginView'
import GameView from './components/GameView'
import EndGameView from './components/EndGameView'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 'login'
    }
    this.navigateTo = this.navigateTo.bind(this)
  }

  navigateTo(view) {
    this.setState({ currentView: view })
  }

  render() {
    const { currentView } = this.state
    let viewComponent

    switch (currentView) {
      case 'login':
        viewComponent = <LoginView navigateTo={this.navigateTo} />
        break
      case 'game':
        viewComponent = <GameView navigateTo={this.navigateTo} />
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
