import React from 'react'
import PropTypes from 'prop-types'
import Bot from '../models/Bot'

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
    const players = this.props.game.players() || []
    const uniqueRanks = [...new Set(players[0].hand().map(card => card.rank()))]

    this.setState({
      selectedRank: uniqueRanks[0] || '',
      selectedOpponent: players.length > 1 ? players[1].name() : ''
    })
  }

  handleRankChange(event) {
    this.setState({ selectedRank: event.target.value })
  }

  handleOpponentChange(event) {
    this.setState({ selectedOpponent: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { selectedRank, selectedOpponent } = this.state
    this.props.playRound(selectedOpponent, selectedRank)
  }

  renderAskForm() {
    if (!this.props.game.isItHumanPlayerTurn()) return null

    const uniqueRanks = [...new Set(this.props.game.players()[0].hand().map(card => card.rank()))]
    const players = this.props.game.players() || []
    const opponents = players.filter(player => player !== this.props.game.players()[0])

    return (
      <form className="ask-form" onSubmit={this.handleSubmit}>
        <label htmlFor="rank">Ask for rank:</label>
        <select id="rank" value={this.state.selectedRank} onChange={this.handleRankChange} data-testid="ask-rank">
          {uniqueRanks.map((rank, index) => (
            <option key={index} value={rank}>{rank}</option>
          ))}
        </select>
        <label htmlFor="opponent">Opponent:</label>
        <select id="opponent" value={this.state.selectedOpponent} onChange={this.handleOpponentChange} data-testid="ask-opponent">
          {opponents.map((player, index) => (
            <option key={index} value={player.name()}>{player.name()}</option>
          ))}
        </select>
        <button className="btn" type="submit" data-testid="ask-button">Ask</button>
      </form>
    )
  }

  renderBooks(player) {
    const books = player.books().flatMap((book) =>
      book.cards().map(card => `${card.rank()} of ${card.suit()}`)
    ).join(', ')
    return (
      <div className="player-books">
        {books || 'No books yet'}
      </div>
    )
  }

  renderPlayerView() {
    const player = this.props.game.players().find(player => !(player instanceof Bot))
    if (!player) return null
  
    const hand = player.hand().map(card => `${card.rank()} of ${card.suit()}`).join(', ')
  
    return (
      <li className="player-name">
        {player.name()}
        <br />
        <span>Hand:</span>
        <div className="player-hand">
          {hand || 'No cards in hand'}
        </div>
        {this.renderBooks(player)}
      </li>
    )
  }
  

  renderBotView() {
    // const bots = this.props.game.players().filter(player => player instanceof Bot)
    const bots = this.props.game.players().slice(1)
  
    return (
      <>
        {bots.map(bot => {
          const hand = bot.hand().map(card => `${card.rank()} of ${card.suit()}`).join(', ')
          const books = bot.books().flatMap(book =>
            book.cards().map(card => `${card.rank()} of ${card.suit()}`)
          ).join(', ')
  
          return (
            <li className="player-name" key={bot.name()}>
              {bot.name()}
              <br />
              <span>Hand:</span>
              <div className="player-hand">
                {hand || 'No cards in hand'}
              </div>
              <span>Books:</span>
              <div className="player-books">
                {books || 'No books yet'}
              </div>
            </li>
          )
        })}
      </>
    )
  }
  

  renderRoundResults() {
    return (
      <div className="round-results">
        <h2>Round Results</h2>
        <ul>
          {this.props.game.roundResults().map((result, index) => (
            <li key={index}>{result.displayResult()}</li>
          ))}
        </ul>
      </div>
    )
  }

  renderHeader() {
    return (
      <div className="app__header">
        <div className="navbar">
          <nav className="navbar__content navbar__content--justify-start">
            <span>Go Fish</span>
          </nav>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="game-view">
        <div className="game-board">
          <h2>Players</h2>
          <ul>
            {this.renderPlayerView()}
            {this.renderBotView()}
          </ul>
        </div>
        <div className="game-feed">
          {this.renderRoundResults()}
          {this.renderAskForm()}
        </div>
        <div className="player-hand">
          <span>Your Hand</span>
          {this.renderPlayerView()}
        </div>
        <div className="player-books">
          <span>Your Books</span>
          {this.renderBooks(this.props.game.players()[0])}
        </div>
      </div>
    )
  }
}

export default GameView
