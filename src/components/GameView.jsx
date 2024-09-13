import React from 'react'
import PropTypes from 'prop-types'
// import Bot from '../models/Bot'

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

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const players = this.props.game.players() || []
      const uniqueRanks = [...new Set(players[0].hand().map(card => card.rank()))]

      this.setState({
        selectedRank: uniqueRanks[0] || '',
        selectedOpponent: players.length > 1 ? players[1].name() : ''
      })
    }
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

  handleNavigateToLogin() {
    this.props.navigateTo('login')
  }

  players() {
    return this.props.game.players()
  }

  playerHand(player) {
    return player.hand()
  }

  playerBooks(player) {
    return player.books()
  }

  renderAskForm() {
    if (!this.props.game.isItHumanPlayerTurn()) return null

    const uniqueRanks = [...new Set(this.props.game.players()[0].hand().map(card => card.rank()))]
    const players = this.props.game.players() || []
    const opponents = players.filter(player => player !== this.props.game.players()[0] && player.hand().length > 0)

    return (
      <form className="edit_game" onSubmit={this.handleSubmit}>
        <div className="actions">
          <div className="actions__input-collection">
            <div className="form-group">
              <label className="form-label" htmlFor="opponent">Opponent:</label>
              <select className="form-control form-control--small" id="opponent" value={this.state.selectedOpponent} onChange={this.handleOpponentChange} data-testid="ask-opponent">
                {opponents.map((player, index) => (
                  <option key={index} value={player.name()}>{player.name()}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="rank">Ask for rank:</label>
              <select className="form-control form-control--small" id="rank" value={this.state.selectedRank} onChange={this.handleRankChange} data-testid="ask-rank">
                {uniqueRanks.map((rank, index) => (
                  <option key={index} value={rank}>{rank}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn-primary" type="submit" data-testid="ask-button">Ask</button>
        </div>
      </form>
    )
  }

  renderRoundResults() {
    return (
      <>
        {this.props.game.roundResults().reverse().map((result) => this.renderMessage(result))}
      </>
    )
  }

  renderMessage(result) {
    return (
      <div className="notifications__round_result">
        <div className="message game_feedback">
          {result.displayResult()}
        </div>
      </div>
    )
  }

  renderCard(card) {
    const rank = card.rank().toLowerCase()
    const suit = card.suit().toLowerCase()
    const src = `/assets/images/cards/${rank}-${suit}.svg`
    const alt = "Playing Card"

    return <img key={`${rank}-${suit}`} src={src} alt={alt} />
  }
  // TODO: Just render first card of a book
  renderBook(book) {
    return (
      <>{book.cards().map(card => this.renderCard(card))}</>
    )
  }

  renderPlayerAccordion(player) {
    return (
      <details className="accordion">
        <summary>
          <span className="material-symbols-outlined icon--outlined icon--medium icon--weight-normal icon--normal-emphasis">arrow_right</span>
          <span>{player.name()}</span>
          <div className="flex gap-lg">
            <span>Cards: <span className="fw-semibold">{player.hand().length}</span></span>
            <span>Books: <span className="fw-semibold">{player.books().length}</span></span>
          </div>
        </summary>
        <div className="card-tray">
          <div className="card-stack card-stack--accordion-hand">
            {this.playerHand(player).map(card => (this.renderCard(card)))}
          </div>
          <div className="card-stack card-stack--accordion-books">
            {this.playerBooks(player).map(book => (this.renderBook(book)))}
          </div>
        </div>
      </details>
    )
  }

  renderHand(player) {
    return (
      <div className="card-tray">
        <div className="card-stack card-stack--player-hand">
          {this.playerHand(player).map(card => (this.renderCard(card)))}
        </div>
      </div>
    )
  }

  renderPlayerBooks() {
    return <div className="go-fish-panel go-fish-panel--player-books go-fish-panel--bottom-row">
      <div className="go-fish-panel__header go-fish-panel__header-title">
        <span>Your Books</span>
      </div>
      <div className="card-tray">
        <div className="card-stack card-stack--player-books">
          {this.playerBooks(this.players()[0]).map(book => (this.renderBook(book)))}
        </div>
      </div>
    </div>
  }

  renderPlayerHand() {
    return <div className="go-fish-panel go-fish-panel--player-hand go-fish-panel--bottom-row">
      <div className="go-fish-panel__header go-fish-panel__header-title">
        <span>Your Hand</span>
      </div>
      {this.renderHand(this.players()[0])}
    </div>
  }

  renderGameFeed() {
    return <div className="go-fish-panel go-fish-panel--game-feed">
      <div className="go-fish-panel__header go-fish-panel__header--game-feed">
        <span>Game Feed</span>
        <button className="btn btn-primary btn--small">SpareButton</button>
      </div>
      <div className="go-fish-panel__body go-fish-panel__body--game-feed">
        <div className="notifications">
          {this.renderRoundResults()}
        </div>
        {this.renderAskForm()}
      </div>
    </div>
  }

  renderGameBoard() {
    return <div className="go-fish-panel go-fish-panel--game-board">
      <div className="go-fish-panel__header go-fish-panel__header--game-board">
        <a className="btn btn--pill btn--icon btn--no-border btn--small back-arrow" href="" onClick={this.handleNavigateToLogin}>&nbsp;←</a>
        <span>Game Board</span>
      </div>
      <div className="go-fish-panel__body go-fish-panel__body--game-board">
        <div className='players-decks__header'>
          <span>Players</span>
        </div>
        <div className="divider divider--medium"></div>
        <div className="players-hands">
          {this.players().map(player => this.renderPlayerAccordion(player))}
        </div>
      </div>
    </div>
  }

  render() {
    return (
      <div className="game-view" data-testid="game-view">
        {this.renderGameBoard()}
        {this.renderGameFeed()}
        {this.renderPlayerHand()}
        {this.renderPlayerBooks()}
      </div>
    )
  }
}

export default GameView
