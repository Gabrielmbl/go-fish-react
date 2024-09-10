import React from 'react'
import PropTypes from 'prop-types'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  static propTypes = {
    playerName: PropTypes.string.isRequired,
    opponentCount: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  handleChange(event) {
    const { id, value } = event.target
    this.props.onChange(id, value)
  }

  render() {
    const { playerName, opponentCount, onSubmit } = this.props
    return (
      <form onSubmit={onSubmit} className="form-group login-container">
        <label className="form-label" htmlFor="playerName">Your name</label>
        <input
          type="text"
          placeholder="Name"
          id="playerName"
          className="form-control form-control--large"
          value={playerName}
          onChange={this.handleChange}
        />
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
        <input className="btn" type="submit" value="Start Game" />
      </form>
    )
  }
}

export default LoginForm
