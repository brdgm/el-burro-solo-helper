import Phase from './enum/Phase'

export default interface GameRoundTile {
  id: string
  round: number
  phase?: Phase[]
}
