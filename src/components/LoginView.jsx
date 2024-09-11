import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'

class LoginView extends React.Component {
  constructor(props) {
    super(props)
    // TODO: Don't store the state here, just in App
    // TODO: Have it so that onSubmit, it will send the state from Form to App
    this.state = {
      playerName: '',
      opponentCount: 1
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    setPlayerInfo: PropTypes.func.isRequired,
  }
  
  handleLogin(event) {
    event.preventDefault()
    const { playerName, opponentCount } = this.state
    if (playerName === '' || opponentCount < 1 || opponentCount > 8) return
    this.props.setPlayerInfo(playerName, opponentCount)
    this.props.navigateTo('game')
  }
  
  handleChange(id, value) {
    this.setState({
      [id]: value
    })
  }
  
  render() {
    const { playerName, opponentCount } = this.state
    return (
      <div className="flex justify-center">
        <LoginForm
          playerName={playerName}
          opponentCount={opponentCount}
          onChange={this.handleChange}
          onSubmit={this.handleLogin}
        />
      </div>
    )
  }
}

export default LoginView
