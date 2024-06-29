import { expect } from 'chai'
import GoodTokens from '@/services/GoodTokens'
import mockCardDeck from '../helper/mockCardDeck'
import determineDeliveryGood from '@/util/determineDeliveryGood'
import CardDeck from '@/services/CardDeck'
import Good from '@/services/enum/Good'

describe('util/determineDeliveryGood', () => {
  it('determine-up', () => {
    const cardDeck = CardDeck.fromPersistence(mockCardDeck({roundDiscard:['R01'/*5*/],auxiliaryPile:['R03'/*up*/]}))
    const goodTokens = GoodTokens.new()

    determineDeliveryGood(goodTokens, cardDeck)
    expect(goodTokens.used).to.eql([Good.WINE])

    determineDeliveryGood(goodTokens, cardDeck)
    expect(goodTokens.used).to.eql([Good.WINE,Good.MEAT])

    goodTokens.remove(Good.WINE)
    determineDeliveryGood(goodTokens, cardDeck)
    expect(goodTokens.used).to.eql([Good.MEAT,Good.OLIVE_GRAIN])
  })

  it('determine-down', () => {
    const cardDeck = CardDeck.fromPersistence(mockCardDeck({roundDiscard:['R07'/*1*/],auxiliaryPile:['R01'/*down*/]}))
    const goodTokens = GoodTokens.new()

    determineDeliveryGood(goodTokens, cardDeck)
    expect(goodTokens.used).to.eql([Good.OLIVE_GRAIN])

    determineDeliveryGood(goodTokens, cardDeck)
    expect(goodTokens.used).to.eql([Good.OLIVE_GRAIN,Good.MEAT])

    determineDeliveryGood(goodTokens, cardDeck)
    expect(goodTokens.used).to.eql([Good.OLIVE_GRAIN,Good.MEAT,Good.WINE])
  })
})
