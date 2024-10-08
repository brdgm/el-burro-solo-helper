import Action from './enum/Action'
import CardPlacement from './enum/CardPlacement'
import DeliveryTarget from './enum/DeliveryTarget'
import DiceModification from './enum/DiceModification'
import DifficultyLevel from './enum/DifficultyLevel'
import DonkeySelection from './enum/DonkeySelection'
import JunctionSelection from './enum/JunctionSelection'
import PlusTile from './enum/PlusTile'
import SpecialFarmCardSelection from './enum/SpecialFarmCardSelection'

export default interface Card {
  id: string
  cardPlacement: CardPlacement
  diceValue: number
  diceModification: DiceModification
  specialFarmCardSelection: SpecialFarmCardSelection
  deliveryAction: Action
  donkeySelection: DonkeySelection
  junctionSelection: JunctionSelection
  deliveryTarget: DeliveryTarget
  siestaPlusTile?: PlusTile
  donkeyPlusTile?: PlusTile
  siestaValue: number
  additionalGoatDelivery?: boolean
  donkeyValue: number
  stableScoringValue: number
  difficultyLevel: DifficultyLevel
}
