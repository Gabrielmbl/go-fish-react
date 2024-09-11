import Player from './Player'

class Bot extends Player {
  constructor(name, memory = {}) {
    super(name)
    this._memory = memory
  }

  memory() {
    return this._memory
  }

  chooseRandomRank() {
    const randomIndex = Math.floor(Math.random() * this.hand().length)
    return this.hand()[randomIndex].rank()
  }

  chooseRandomOpponent(players) {
    const opponents = players.filter(player => player !== this)
    const randomIndex = Math.floor(Math.random() * opponents.length)
    return opponents[randomIndex]
  }
  // TODO: When is bot's turn, 
  // Who asked for what more recently?, which cards do i have, who has asked for those and when
  updateMemory(roundResult) {
    const roundPlayer = roundResult.playerName()
    const opponentName = roundResult.opponentName()
    const rank = parseInt(roundResult.rankAsked())
    const booksMadeArrayIntegers = roundResult.booksMade().map(rank => parseInt(rank))

    // Create key for player and opponent if not present
    if (!this.memory()[roundPlayer]) {
      this.memory()[roundPlayer] = []
    }
    if (!this.memory()[opponentName]) {
      this.memory()[opponentName] = []
    }

    // Taking ranks from opponent
    if (roundResult.cardFished == null) {
      this.memory()[roundPlayer].push(rank)
      this.memory()[opponentName] = this.memory()[opponentName].filter(memoryRank => memoryRank !== rank)
    }

    // Player fished for card they asked for
    if (roundResult.cardFished() && roundResult.cardFished().rank() == rank) {

      // If memory does not have rank
      if (!this.memory()[roundPlayer].includes(rank)) {

        this.memory()[roundPlayer].push(rank)
        this.memory()[roundPlayer].push(rank)
      } else { // If memory already has that rank entry

        this.memory()[roundPlayer].push(rank)
      }
    }
    // Books getting made situation
    if (this.memory()[roundPlayer].some(memoryRank => booksMadeArrayIntegers.includes(memoryRank))) {
      this.memory()[roundPlayer] = this.memory()[roundPlayer].filter(memoryRank => !booksMadeArrayIntegers.includes(memoryRank))
    }
  }
}

export default Bot