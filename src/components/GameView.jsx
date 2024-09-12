import React from 'react'
import PropTypes from 'prop-types'

class GameView extends React.Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    game: PropTypes.object.isRequired,
    playRound: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedRank: '',
      selectedOpponent: '',
    }

    this.handleRankChange = this.handleRankChange.bind(this)
    this.handleOpponentChange = this.handleOpponentChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // Initialize default state values based on the game data
    const players = this.props.game.players() || []
    const uniqueRanks = [...new Set(players[0].hand().map(card => card.rank()))]

    // Example default values
    this.setState({
      selectedRank: uniqueRanks[0] || '', // Default to the first rank
      selectedOpponent: players.length > 1 ? players[1].name() : '' // Default to the second player
    })
  }

  handleRankChange(event) {
    this.setState({ selectedRank: event.target.value })
  }

  handleOpponentChange(event) {
    console.log(event.target.value)
    this.setState({ selectedOpponent: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { selectedRank, selectedOpponent } = this.state
    console.log('Form submitted:', selectedOpponent, selectedRank)
    this.props.playRound(selectedOpponent, selectedRank)
  }

  render() {
    const { game } = this.props
    const players = game.players() || []
    const uniqueRanks = [...new Set(game.players()[0].hand().map(card => card.rank()))]

    return (
      <div>
        <h1>Game View</h1>
        <h2>Players:</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player.name()}
              <br />
              <span>Hand:</span>
              <ul data-testid="player">
                {player.hand().map((card, i) => (
                  <li key={i}>{card.rank()} of {card.suit()}</li>
                ))}
              </ul>
              <span>Books:</span>
              <ul>
                {player.books().length === 0 ? 'No books yet' : player.books().flatMap(book => book.cards().map((card, i) => (
                  <li key={i}>{card.rank()} of {card.suit()}</li>
                )))}
              </ul>
            </li>
          ))}
        </ul>
        <h2>Round Results</h2>
        <div>
          <ul>
            {game.roundResults().map((result, index) => (
              <li key={index}>{result.displayResult()}</li>
            ))}
          </ul>
        </div>
        {game.isItHumanPlayerTurn() && (
          <form onSubmit={this.handleSubmit}>
            <label>
              Ask for rank:
              <select value={this.state.selectedRank} onChange={this.handleRankChange}>
                {uniqueRanks.map((rank, index) => (
                  <option key={index} value={rank}>{rank}</option>
                ))}
              </select>
            </label>
            <label>
              Opponent:
              <select value={this.state.selectedOpponent} onChange={this.handleOpponentChange}>
                {players.filter(player => player !== game.players()[0]).map((player, index) => (
                  <option key={index} value={player.name()}>{player.name()}</option>
                ))}
              </select>
            </label>
            <button type="submit">Ask</button>
          </form>
        )}
      </div>
    )
  }
}

export default GameView
