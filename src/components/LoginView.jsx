import React from 'react'
import PropTypes from 'prop-types'

class LoginView extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  static propTypes = {
    navigateTo: PropTypes.func.isRequired
  }
  
  handleLogin() {
    this.props.navigateTo('game')
  }
  
  render() {
    return (
      <div>
        <h1>Login View Page</h1>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    )
  }
}

export default LoginView
