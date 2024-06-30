import CardDeck from '@/services/CardDeck'
import Card from '@/services/Card'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

describe('services/CardDeck', () => {
  it('new', () => {
    getAllEnumValues(DifficultyLevel).forEach(difficultyLevel => {
      const deck = CardDeck.new(difficultyLevel)

      expect(deck.currentRoundCard, 'currentRoundCard').to.undefined
      expect(deck.roundPile.length, 'roundPile size').to.eq(4)
      expect(deck.roundDiscard.length, 'roundPile size').to.eq(0)
      expect(deck.currentAuxiliaryCard, 'currentAuxiliaryCard').to.undefined
      expect(deck.auxiliaryPile.length, 'auxiliaryPile size').to.eq(8)
      expect(deck.auxiliaryDiscard.length, 'auxiliaryDiscard size').to.eq(0)  

      if (difficultyLevel != DifficultyLevel.RANDOM) {
        expect(deck.roundPile.filter(card => card.difficultyLevel == difficultyLevel).length, 'roundPile = difficulty').to.eq(4)
        expect(deck.auxiliaryPile.filter(card => card.difficultyLevel == difficultyLevel).length, 'auxiliaryPile != difficulty').to.eq(0)
      }
      
      const persistence = deck.toPersistence()
      expect(persistence.roundPile.length, 'roundPile size').to.eq(4)
      expect(persistence.roundDiscard.length, 'roundPile size').to.eq(0)
      expect(persistence.auxiliaryPile.length, 'auxiliaryPile size').to.eq(8)
      expect(persistence.auxiliaryDiscard.length, 'auxiliaryDiscard size').to.eq(0)  
    })
  })

  it('drawRound', () => {
    const deck = CardDeck.fromPersistence({
      roundPile: ['R01', 'R02', 'R03', 'R04'], roundDiscard: [],
      auxiliaryPile: [], auxiliaryDiscard: []
    })

    let card = deck.drawRound()
    expect(card.id).to.eq('R01')
    expect(deck.currentRoundCard?.id).to.eq('R01')

    card = deck.drawRound()
    expect(card.id).to.eq('R02')
    expect(deck.currentRoundCard?.id).to.eq('R02')

    card = deck.drawRound()
    expect(card.id).to.eq('R03')
    expect(deck.currentRoundCard?.id).to.eq('R03')

    card = deck.drawRound()
    expect(card.id).to.eq('R04')
    expect(deck.currentRoundCard?.id).to.eq('R04')

    expect(() => deck.drawRound()).to.throw('No more round cards left.')
  })

  it('drawAuxiliary', () => {
    const deck = CardDeck.new(DifficultyLevel.RANDOM)

    const lastCards : Card[] = []
    let card : Card
    for (let i=0; i<8; i++) {
      card = deck.drawAuxiliary()
      // ensure unique cards
      expect(lastCards.filter(item => item.id == card.id).length).to.eq(0)
      lastCards.push(card)
      expect(deck.currentAuxiliaryCard).to.not.undefined
    }

    // draw after reshuffle
    card = deck.drawAuxiliary()
    expect(card).to.not.undefined
    expect(deck.currentAuxiliaryCard).to.not.undefined
  })
})
