import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import DiceModification from './enum/DiceModification'
import SpecialFarmCardSelection from './enum/SpecialFarmCardSelection'
import DeliveryType from './enum/DeliveryType'
import DonkeySelection from './enum/DonkeySelection'
import JunctionSelection from './enum/JunctionSelection'
import DeliveryTarget from './enum/DeliveryTarget'
import PlusTile from './enum/PlusTile'
import DifficultyLevel from './enum/DifficultyLevel'

const cards : Card[] = [
  {
    id: 'R01',
    diceValue: 5,
    diceModification: DiceModification.DOWN,
    specialFarmCardSelection: SpecialFarmCardSelection.LEFT,
    deliveryType: DeliveryType.DONKEY,
    donkeySelection: DonkeySelection.REAR,
    junctionSelection: JunctionSelection.LONG_WAY,
    deliveryTarget: DeliveryTarget.LOCAL_MARKET,
    siestaPlusTile: PlusTile.TWO,
    donkeyPlusTile: PlusTile.TWO,
    siestaValue: 1,
    donkeyValue: 2,
    stableScoringValue: 3,
    difficultyLevel: DifficultyLevel.EASY
  },
  {
    id: 'R02',
    diceValue: 3,
    diceModification: DiceModification.DOWN,
    specialFarmCardSelection: SpecialFarmCardSelection.RIGHT,
    deliveryType: DeliveryType.DONKEY,
    donkeySelection: DonkeySelection.REAR,
    junctionSelection: JunctionSelection.LONG_WAY,
    deliveryTarget: DeliveryTarget.LOCAL_MARKET,
    donkeyPlusTile: PlusTile.TWO,
    siestaValue: 3,
    donkeyValue: 1,
    stableScoringValue: 1,
    difficultyLevel: DifficultyLevel.EASY
  },
  {
    id: 'R03',
    diceValue: 4,
    diceModification: DiceModification.UP,
    specialFarmCardSelection: SpecialFarmCardSelection.LEFT,
    deliveryType: DeliveryType.DONKEY,
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
    diceValue: 6,
    diceModification: DiceModification.UP,
    specialFarmCardSelection: SpecialFarmCardSelection.RIGHT,
    deliveryType: DeliveryType.GOAT,
    donkeySelection: DonkeySelection.LEADING,
    junctionSelection: JunctionSelection.SHORT_WAY,
    deliveryTarget: DeliveryTarget.MARKET_BARROW,
    siestaPlusTile: PlusTile.TWO,
    donkeyPlusTile: PlusTile.TWO,
    siestaValue: 2,
    additionalGoatDelivery: true,
    donkeyValue: 1,
    stableScoringValue: 2,
    difficultyLevel: DifficultyLevel.EASY
  },
  {
    id: 'R05',
    diceValue: 2,
    diceModification: DiceModification.DOWN,
    specialFarmCardSelection: SpecialFarmCardSelection.MIDDLE,
    deliveryType: DeliveryType.DONKEY,
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
    diceValue: 5,
    diceModification: DiceModification.UP,
    specialFarmCardSelection: SpecialFarmCardSelection.MIDDLE,
    deliveryType: DeliveryType.GOAT,
    donkeySelection: DonkeySelection.REAR,
    junctionSelection: JunctionSelection.SHORT_WAY,
    deliveryTarget: DeliveryTarget.LOCAL_MARKET,
    siestaPlusTile: PlusTile.ONE,
    donkeyPlusTile: PlusTile.ONE,
    siestaValue: 3,
    donkeyValue: 2,
    stableScoringValue: 2,
    difficultyLevel: DifficultyLevel.MEDIUM
  },
  {
    id: 'R07',
    diceValue: 1,
    diceModification: DiceModification.UP,
    specialFarmCardSelection: SpecialFarmCardSelection.LEFT,
    deliveryType: DeliveryType.DONKEY,
    donkeySelection: DonkeySelection.LEADING,
    junctionSelection: JunctionSelection.SHORT_WAY,
    deliveryTarget: DeliveryTarget.LOCAL_MARKET,
    siestaPlusTile: PlusTile.ONE,
    siestaValue: 1,
    donkeyValue: 4,
    stableScoringValue: 2,
    difficultyLevel: DifficultyLevel.MEDIUM
  },
  {
    id: 'R08',
    diceValue: 4,
    diceModification: DiceModification.DOWN,
    specialFarmCardSelection: SpecialFarmCardSelection.LEFT,
    deliveryType: DeliveryType.GOAT,
    donkeySelection: DonkeySelection.LEADING,
    junctionSelection: JunctionSelection.SHORT_WAY,
    deliveryTarget: DeliveryTarget.MARKET_BARROW,
    donkeyPlusTile: PlusTile.TWO,
    siestaValue: 4,
    additionalGoatDelivery: true,
    donkeyValue: 1,
    stableScoringValue: 3,
    difficultyLevel: DifficultyLevel.MEDIUM
  },
  {
    id: 'R09',
    diceValue: 3,
    diceModification: DiceModification.DOWN,
    specialFarmCardSelection: SpecialFarmCardSelection.RIGHT,
    deliveryType: DeliveryType.DONKEY,
    donkeySelection: DonkeySelection.REAR,
    junctionSelection: JunctionSelection.SHORT_WAY,
    deliveryTarget: DeliveryTarget.LOCAL_MARKET,
    siestaPlusTile: PlusTile.TWO,
    donkeyPlusTile: PlusTile.TWO,
    siestaValue: 3,
    additionalGoatDelivery: true,
    donkeyValue: 3,
    stableScoringValue: 2,
    difficultyLevel: DifficultyLevel.HARD
  },
  {
    id: 'R10',
    diceValue: 2,
    diceModification: DiceModification.UP,
    specialFarmCardSelection: SpecialFarmCardSelection.MIDDLE,
    deliveryType: DeliveryType.GOAT,
    donkeySelection: DonkeySelection.LEADING,
    junctionSelection: JunctionSelection.SHORT_WAY,
    deliveryTarget: DeliveryTarget.MARKET_BARROW,
    siestaPlusTile: PlusTile.ONE,
    siestaValue: 3,
    donkeyValue: 4,
    stableScoringValue: 3,
    difficultyLevel: DifficultyLevel.HARD
  },
  {
    id: 'R11',
    diceValue: 1,
    diceModification: DiceModification.DOWN,
    specialFarmCardSelection: SpecialFarmCardSelection.MIDDLE,
    deliveryType: DeliveryType.GOAT,
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
    diceValue: 6,
    diceModification: DiceModification.UP,
    specialFarmCardSelection: SpecialFarmCardSelection.RIGHT,
    deliveryType: DeliveryType.GOAT,
    donkeySelection: DonkeySelection.LEADING,
    junctionSelection: JunctionSelection.SHORT_WAY,
    deliveryTarget: DeliveryTarget.MARKET_BARROW,
    donkeyPlusTile: PlusTile.ONE,
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
   * Get cards by difficulty level
   * @param difficultyLevel Difficulty level
   * @returns Cards
   */
  getByDifficultyLevel(difficultyLevel: DifficultyLevel) : Card[] {
    return cards.filter(card => card.difficultyLevel === difficultyLevel)
  }

}
