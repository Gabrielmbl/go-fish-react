import React from 'react'
import PropTypes from 'prop-types'

class EndGameView extends React.Component {
  constructor(props) {
    super(props)
    this.handleNavigateToGame = this.handleNavigateToGame.bind(this)
    this.handleNavigateToLogin = this.handleNavigateToLogin.bind(this)
  }

  static propTypes = {
    winners: PropTypes.array.isRequired, 
    navigateTo: PropTypes.func.isRequired,
  }

  handleNavigateToGame() {
    this.props.navigateTo('game')
  }

  handleNavigateToLogin() {
    this.props.navigateTo('login')
  }

  render() {
    const { winners } = this.props

    return (
      <div>
        <h1>End Game View</h1>
        {winners.length > 0 ? (
          <div>
            <h2>Winner{winners.length > 1 ? 's' : ''}:</h2>
            <ul>
              {winners.map((winner, index) => (
                <li key={index}>{winner.name()}</li>
              ))}
            </ul>
          </div>
        ) : (
          <h2>No winners yet!</h2>
        )}
        <button onClick={this.handleNavigateToLogin}>Back to Login View</button>
        <button onClick={this.handleNavigateToGame}>Back to Game View</button>
      </div>
    )
  }
}

export default EndGameView
