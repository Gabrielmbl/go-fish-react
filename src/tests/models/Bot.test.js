import { describe, it, expect, beforeEach } from 'vitest'
import Bot from '../../models/Bot'
import Player from '../../models/Player'
import Card from '../../models/Card'
import RoundResult from '../../models/RoundResult'

describe('Bot', () => {
  let bot

  beforeEach(() => {
    bot = new Bot('Lucas')
  })

  describe('chooseRandomRank', () => {
    it('should return a random rank', () => {
      bot.addToHand([new Card('3', 'Hearts'), new Card('5', 'Clubs'), new Card('7', 'Diamonds')])
      const rank = bot.chooseRandomRank()
      expect(rank.length).toBe(1)
      expect(['3', '5', '7']).toContain(rank)
    })
  })

  describe('chooseRandomOpponent', () => {
    it('should return a random opponent', () => {
      const players = [new Player('Gabriel'), new Player('Pedro'), bot]
      const opponent = bot.chooseRandomOpponent(players)
      expect(players).toContain(opponent)
      expect(opponent).not.toBe(bot)
    })
  })

  describe('updateMemory', () => {
    it('should update the bot memory', () => {
      const roundResult = new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '3' })
      bot.updateMemory(roundResult)
      expect(bot.memory()).toEqual({ 'Gabriel': [3] })
    })

    // it('should remove the rank from memory if player made a book', () => {
    //   bot.updateMemory(new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '3' }))
    //   expect(bot.memory()).toEqual({ 'Gabriel': [3] })
    //   const roundResult = new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '3', booksMade: ['3'] })
    //   bot.updateMemory(roundResult)
    //   expect(bot.memory()).toEqual({ 'Gabriel': [] })
    // })

    // it('if memory did not have rank, it should add 2 of the rank to memory when player fished a card they asked for', () => {
    //   const roundResult = new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '3', cardFished: new Card('3', 'Hearts') })
    //   bot.updateMemory(roundResult)
    //   expect(bot.memory()).toEqual({ 'Gabriel': [3, 3] })
    // })

    // it('if memory already had rank, it should update memory by one when player fished a card they asked for', () => {
    //   bot.updateMemory(new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '3' }))
    //   expect(bot.memory()).toEqual({ 'Gabriel': [3] })
    //   bot.updateMemory(new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '3', cardFished: new Card('3', 'Clubs') }))
    //   expect(bot.memory()).toEqual({ 'Gabriel': [3, 3] })
    // })

    // it('should remove the rank from opponent memory when player takes ranks from opponent', () => {
    //   bot.memory()['Lucas'] = [3]
    //   expect(bot.memory()).toEqual({ 'Lucas': [3] })
    //   bot.updateMemory(new RoundResult({ playerName: 'Gabriel', opponentName: 'Lucas', rankAsked: '3' }))
    //   expect(bot.memory()).toEqual({ 'Gabriel': [3], 'Lucas': [] })
    // })
  })
})
