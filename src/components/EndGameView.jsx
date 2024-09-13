import React from 'react'
import PropTypes from 'prop-types'

class EndGameView extends React.Component {
  constructor(props) {
    super(props)
    this.handleNavigateToLogin = this.handleNavigateToLogin.bind(this)

  }

  static propTypes = {
    winners: PropTypes.array.isRequired,
    finishGame: PropTypes.func.isRequired,
  }

  handleNavigateToLogin() {
    this.props.finishGame()
  }

  render() {
    const { winners } = this.props

    return (
      <>
        <div className="flex flex-col justify-center text-center transform-y-15 text-center">
          <span className="font-5x-large">Game Over</span>
          <div className="flex flex-col gap-md outlined-container">
            <div className="font-2x-large">
              {winners.length > 0 ? (
                <div>
                  <span>Winner{winners.length > 1 ? 's' : ''}: </span>
                    {winners.map((winner, index) => (
                      <span key={index}>{winner.name()}</span>
                    ))}
                </div>
              ) : (
                <span>No winners yet!</span>
              )}
            </div>
            <div className="flex gap-md">
              <button className="btn btn-secondary" onClick={this.handleNavigateToLogin}>Back to Login View</button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default EndGameView
