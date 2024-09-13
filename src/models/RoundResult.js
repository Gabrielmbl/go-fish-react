class RoundResult {
  constructor({ playerName, opponentName, rankAsked, cardFished = null, booksMade = [], gameWinners = [], deckEmpty = false, playerFished = false }) {
    this._playerName = playerName
    this._opponentName = opponentName
    this._rankAsked = rankAsked
    this._cardFished = cardFished
    this._booksMade = booksMade
    this._gameWinners = gameWinners
    this._deckEmpty = deckEmpty
    this._playerFished = playerFished
  }

  playerName() {
    return this._playerName
  }

  opponentName() {
    return this._opponentName
  }

  rankAsked() {
    return this._rankAsked
  }

  cardFished() {
    return this._cardFished
  }

  booksMade() {
    return this._booksMade
  }

  gameWinners() {
    return this._gameWinners
  }

  deckEmpty() {
    return this._deckEmpty
  }

  playerFished() {
    return this._playerFished
  }

  describeAskAction() {
    return `${this.playerName()} asked ${this.opponentName()} for ${this.rankAsked()}s`
  }

  describeFishResult() {
    if (this.playerFished()) {
      if (this.cardFished()) {
        if (this.cardFished().rank() === this.rankAsked()) {
          return ` and fished a ${this.cardFished().rank()} of ${this.cardFished().suit()}`
        }
        else {
          return ` and went fishing`
        }
      }
      else if (this.deckEmpty()) {
        return ` , went fishing, and the deck was empty`
      }
    }
    else {
      return ` and took ${this.rankAsked()}s from ${this.opponentName()}`
    }
  }

  describeBooksMade() {
    if (this.booksMade().length > 0) {
      const bookRanks = this.booksMade().map(rank => `${rank}s`)
      return ` ${this.playerName()} made books of ${bookRanks.join(', ')}.`
    } else {
      return ''
    }
  }

  displayResult() {
    return `${this.describeAskAction()}${this.describeFishResult()}.${this.describeBooksMade()}`
  }
}

export default RoundResult