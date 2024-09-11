import Deck from './Deck.js';

class Card {
  constructor(rank, suit) {
    this._rank = rank
    this._suit = suit
  }

  rank() {
    return this._rank
  }

  suit() {
    return this._suit
  }

  numericalRank() {
    return Deck.RANKS.indexOf(this.rank()) + 1
  }
}

export default Card