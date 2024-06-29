import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import DiceModification from './enum/DiceModification'
import SpecialFarmCardSelection from './enum/SpecialFarmCardSelection'
import DonkeySelection from './enum/DonkeySelection'
import JunctionSelection from './enum/JunctionSelection'
import DeliveryTarget from './enum/DeliveryTarget'
import PlusTile from './enum/PlusTile'
import DifficultyLevel from './enum/DifficultyLevel'
import CardPlacement from './enum/CardPlacement'
import Action from './enum/Action'

/**
 * Solo game round cards.
 */
const cards : Card[] = [
  {
    id: 'R01',
    cardPlacement: CardPlacement.RIGHT,
    diceValue: 5,
    diceModification: DiceModification.DOWN,
    specialFarmCardSelection: SpecialFarmCardSelection.LEFT,
    deliveryAction: Action.DONKEY_DELIVERY,
    donkeySelection: DonkeySelection.REAR,
    junctionSelection: JunctionSelection.LONG_WAY,
    deliveryTarget: DeliveryTarget.LOCAL_MARKET,
    siestaPlusTile: PlusTile.DOUBLE,
    donkeyPlusTile: PlusTile.DOUBLE,
    siestaValue: 1,
    donkeyValue: 2,
    stableScoringValue: 3,
    difficultyLevel: DifficultyLevel.EASY
  },
  {
    id: 'R02',
    cardPlacement: CardPlacement.RIGHT,
    diceValue: 3,
    diceModification: DiceModification.DOWN,
    specialFarmCardSelection: SpecialFarmCardSelection.RIGHT,
    deliveryAction: Action.DONKEY_DELIVERY,
    donkeySelection: DonkeySelection.REAR,
    junctionSelection: JunctionSelection.LONG_WAY,
    deliveryTarget: DeliveryTarget.LOCAL_MARKET,
    donkeyPlusTile: PlusTile.DOUBLE,
    siestaValue: 3,
    donkeyValue: 1,
    stableScoringValue: 1,
    difficultyLevel: DifficultyLevel.EASY
  },
  {
    id: 'R03',
    cardPlacement: CardPlacement.LEFT,
    diceValue: 4,
    diceModification: DiceModification.UP,
    specialFarmCardSelection: SpecialFarmCardSelection.LEFT,
    deliveryAction: Action.DONKEY_DELIVERY,
    donkeySelection: DonkeySelection.LEADING,
    junctionSelection: JunctionSelection.LONG_WAY,
    deliveryTarget: DeliveryTarget.MARKET_BARROW,
    siestaValue: 2,
    additionalGoatDelivery: true,
    donkeyValue: 2,
    stableScoringValue: 1,
    difficultyLevel: DifficultyLevel.EASY
  },
  {
    id: 'R04',
    cardPlacement: CardPlacement.LEFT,
    diceValue: 6,
    diceModification: DiceModification.UP,
    specialFarmCardSelection: SpecialFarmCardSelection.RIGHT,
    deliveryAction: Action.GOAT_DELIVERY,
    donkeySelection: DonkeySelection.LEADING,
    junctionSelection: JunctionSelection.SHORT_WAY,
    deliveryTarget: DeliveryTarget.MARKET_BARROW,
    siestaPlusTile: PlusTile.DOUBLE,
    donkeyPlusTile: PlusTile.DOUBLE,
    siestaValue: 2,
    additionalGoatDelivery: true,
    donkeyValue: 1,
    stableScoringValue: 2,
    difficultyLevel: DifficultyLevel.EASY
  },
  {
    id: 'R05',
    cardPlacement: CardPlacement.LEFT,
    diceValue: 2,
    diceModification: DiceModification.DOWN,
    specialFarmCardSelection: SpecialFarmCardSelection.MIDDLE,
    deliveryAction: Action.DONKEY_DELIVERY,
    donkeySelection: DonkeySelection.LEADING,
    junctionSelection: JunctionSelection.LONG_WAY,
    deliveryTarget: DeliveryTarget.MARKET_BARROW,
    siestaValue: 2,
    additionalGoatDelivery: true,
    donkeyValue: 3,
    stableScoringValue: 1,
    difficultyLevel: DifficultyLevel.MEDIUM
  },
  {
    id: 'R06',
    cardPlacement: CardPlacement.RIGHT,
    diceValue: 5,
    diceModification: DiceModification.UP,
    specialFarmCardSelection: SpecialFarmCardSelection.MIDDLE,
    deliveryAction: Action.GOAT_DELIVERY,
    donkeySelection: DonkeySelection.REAR,
    junctionSelection: JunctionSelection.SHORT_WAY,
    deliveryTarget: DeliveryTarget.LOCAL_MARKET,
    siestaPlusTile: PlusTile.SINGLE,
    donkeyPlusTile: PlusTile.SINGLE,
    siestaValue: 3,
    donkeyValue: 2,
    stableScoringValue: 2,
    difficultyLevel: DifficultyLevel.MEDIUM
  },
  {
    id: 'R07',
    cardPlacement: CardPlacement.RIGHT,
    diceValue: 1,
    diceModification: DiceModification.UP,
    specialFarmCardSelection: SpecialFarmCardSelection.LEFT,
    deliveryAction: Action.DONKEY_DELIVERY,
    donkeySelection: DonkeySelection.LEADING,
    junctionSelection: JunctionSelection.SHORT_WAY,
    deliveryTarget: DeliveryTarget.LOCAL_MARKET,
    siestaPlusTile: PlusTile.SINGLE,
    siestaValue: 1,
    donkeyValue: 4,
    stableScoringValue: 2,
    difficultyLevel: DifficultyLevel.MEDIUM
  },
  {
    id: 'R08',
    cardPlacement: CardPlacement.LEFT,
    diceValue: 4,
    diceModification: DiceModification.DOWN,
    specialFarmCardSelection: SpecialFarmCardSelection.LEFT,
    deliveryAction: Action.GOAT_DELIVERY,
    donkeySelection: DonkeySelection.LEADING,
    junctionSelection: JunctionSelection.SHORT_WAY,
    deliveryTarget: DeliveryTarget.MARKET_BARROW,
    donkeyPlusTile: PlusTile.DOUBLE,
    siestaValue: 4,
    additionalGoatDelivery: true,
    donkeyValue: 1,
    stableScoringValue: 3,
    difficultyLevel: DifficultyLevel.MEDIUM
  },
  {
    id: 'R09',
    cardPlacement: CardPlacement.RIGHT,
    diceValue: 3,
    diceModification: DiceModification.DOWN,
    specialFarmCardSelection: SpecialFarmCardSelection.RIGHT,
    deliveryAction: Action.DONKEY_DELIVERY,
    donkeySelection: DonkeySelection.REAR,
    junctionSelection: JunctionSelection.SHORT_WAY,
    deliveryTarget: DeliveryTarget.LOCAL_MARKET,
    siestaPlusTile: PlusTile.DOUBLE,
    donkeyPlusTile: PlusTile.DOUBLE,
    siestaValue: 3,
    additionalGoatDelivery: true,
    donkeyValue: 3,
    stableScoringValue: 2,
    difficultyLevel: DifficultyLevel.HARD
  },
  {
    id: 'R10',
    cardPlacement: CardPlacement.LEFT,
    diceValue: 2,
    diceModification: DiceModification.UP,
    specialFarmCardSelection: SpecialFarmCardSelection.MIDDLE,
    deliveryAction: Action.GOAT_DELIVERY,
    donkeySelection: DonkeySelection.LEADING,
    junctionSelection: JunctionSelection.SHORT_WAY,
    deliveryTarget: DeliveryTarget.MARKET_BARROW,
    siestaPlusTile: PlusTile.SINGLE,
    siestaValue: 3,
    donkeyValue: 4,
    stableScoringValue: 3,
    difficultyLevel: DifficultyLevel.HARD
  },
  {
    id: 'R11',
    cardPlacement: CardPlacement.RIGHT,
    diceValue: 1,
    diceModification: DiceModification.DOWN,
    specialFarmCardSelection: SpecialFarmCardSelection.MIDDLE,
    deliveryAction: Action.GOAT_DELIVERY,
    donkeySelection: DonkeySelection.REAR,
    junctionSelection: JunctionSelection.LONG_WAY,
    deliveryTarget: DeliveryTarget.LOCAL_MARKET,
    siestaValue: 4,
    additionalGoatDelivery: true,
    donkeyValue: 4,
    stableScoringValue: 1,
    difficultyLevel: DifficultyLevel.HARD
  },
  {
    id: 'R12',
    cardPlacement: CardPlacement.LEFT,
    diceValue: 6,
    diceModification: DiceModification.UP,
    specialFarmCardSelection: SpecialFarmCardSelection.RIGHT,
    deliveryAction: Action.GOAT_DELIVERY,
    donkeySelection: DonkeySelection.LEADING,
    junctionSelection: JunctionSelection.SHORT_WAY,
    deliveryTarget: DeliveryTarget.MARKET_BARROW,
    donkeyPlusTile: PlusTile.SINGLE,
    siestaValue: 4,
    donkeyValue: 3,
    stableScoringValue: 4,
    difficultyLevel: DifficultyLevel.HARD
  }
]

const cardsMap = new Map<string,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @returns Cards
   */
  getAll() : Card[] {
    return cards
  }

}
