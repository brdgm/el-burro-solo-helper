import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { CardDeckPersistence } from '@/store/state'
import DifficultyLevel from './enum/DifficultyLevel'
import { ref } from 'vue'

/**
 * Manages the two El Burro card decks: game round card deck (4 cards), and auxiliary card deck (8 cards).
 */
export default class CardDeck {

  private _roundPile
  private _roundDiscard
  private _auxiliaryPile
  private _auxiliaryDiscard

  public constructor(roundPile : Card[], roundDiscard : Card[], auxiliaryPile : Card[], auxiliaryDiscard : Card[]) {
    this._roundPile = ref(roundPile)
    this._roundDiscard = ref(roundDiscard)
    this._auxiliaryPile = ref(auxiliaryPile)
    this._auxiliaryDiscard = ref(auxiliaryDiscard)
  }

  public get currentRoundCard() : Card|undefined {
    return this.roundDiscard[0]
  }

  public get roundPile() : readonly Card[] {
    return this._roundPile.value
  }

  public get roundDiscard() : readonly Card[] {
    return this._roundDiscard.value
  }

  public get currentAuxiliaryCard() : Card|undefined {
    return this.auxiliaryDiscard[0]
  }

  public get auxiliaryPile() : readonly Card[] {
    return this._auxiliaryPile.value
  }

  public get auxiliaryDiscard() : readonly Card[] {
    return this._auxiliaryDiscard.value
  }

  /**
   * Draws next card from round pile.
   * If no card left an error is thrown.
   * @returns New current card
   */
  public drawRound() : Card {
    const card = this._roundPile.value.shift()
    if (!card) {
      throw new Error('No more round cards left.')
    }
    this._roundDiscard.value.unshift(card)
    return card
  }

  /**
   * Draws next card from auxiliary pile.
   * If no card is left the pile is reshuffled.
   * @returns New current card
   */
  public drawAuxiliary() : Card {
    const card = this._auxiliaryPile.value.shift()
    if (card) {
      this._auxiliaryDiscard.value.unshift(card)
      return card
    }
    this._auxiliaryPile.value = shuffle(this._auxiliaryDiscard.value)
    this._auxiliaryDiscard.value = []
    return this.drawAuxiliary()
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      roundPile: this._roundPile.value.map(card => card.id),
      roundDiscard: this._roundDiscard.value.map(card => card.id),
      auxiliaryPile: this._auxiliaryPile.value.map(card => card.id),
      auxiliaryDiscard: this._auxiliaryDiscard.value.map(card => card.id)
    }
  }

  /**
   * Creates a shuffled new card deck.
   * @param difficultyLevel DifficultyLevel
   */
  public static new(difficultyLevel: DifficultyLevel) : CardDeck {
    let roundPile : Card[]
    let auxiliaryPile : Card[]
    const cards = shuffle(Cards.getAll())
    if (difficultyLevel == DifficultyLevel.RANDOM) {
      roundPile = cards.slice(0, 4)
      auxiliaryPile = cards.slice(4, 12)
    }
    else {
      roundPile = cards.filter(card => card.difficultyLevel == difficultyLevel)
      auxiliaryPile = cards.filter(card => card.difficultyLevel != difficultyLevel)
    }
    return new CardDeck(roundPile, [], auxiliaryPile, [])
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.roundPile.map(Cards.get),
      persistence.roundDiscard.map(Cards.get),
      persistence.auxiliaryPile.map(Cards.get),
      persistence.auxiliaryDiscard.map(Cards.get)
    )
  }

}
