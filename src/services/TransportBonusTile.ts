import Action from './enum/Action'

export default interface TransportBonusTile {
  id: number
  action: Record<number,Action>[]
}
