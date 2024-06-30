import Action from './enum/Action'

export default interface TransportBonusTile {
  id: number
  action: BonusAction
}

export interface BonusAction {
  [value: number]: Action
}
