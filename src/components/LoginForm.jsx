import React from 'react'
import PropTypes from 'prop-types'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerName: '',
      opponentCount: 1,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  handleChange(event) {
    const { id, value } = event.target
    this.setState({
      [id]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { playerName, opponentCount } = this.state
    this.props.onSubmit(playerName, Number(opponentCount))
  }

  render() {
    const { playerName, opponentCount } = this.state
    return (
      <form onSubmit={this.handleSubmit} className="login-container" data-testid="login-form">
        <div className='form-group'>
          <label className="form-label" htmlFor="playerName">Your name</label>
          <input
            type="text"
            placeholder="Name"
            id="playerName"
            className="form-control form-control--large"
            value={playerName}
            onChange={this.handleChange}
          />
        </div>
        <div className='form-group'>
          <label className="form-label" htmlFor="opponentCount">Number of Opponents</label>
          <select
            id="opponentCount"
            className="form-control form-control--large"
            value={opponentCount}
            onChange={this.handleChange}
          >
            {[...Array(8).keys()].map(n => (
              <option key={n + 1} value={n + 1}>{n + 1}</option>
            ))}
          </select>
        </div>
        <input className="btn" type="submit" value="Start Game" data-testid="start-game-button"/>
      </form>
    )
  }
}

export default LoginForm
