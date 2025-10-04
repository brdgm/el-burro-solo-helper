import Phase from '@/services/enum/Phase'
import { CardDeckPersistence, GoodTokensPersistence, PhasePersistence } from '@/store/state'
import mockCardDeck from './mockCardDeck'
import mockGoodTokens from './mockGoodTokens'
import Player from '@/services/enum/Player'

export default function mockPhase(params?: MockPhaseParams) : PhasePersistence {
  return {
    round: params?.round ?? 1,
    phase: params?.phase ?? Phase.I_FARM,
    turn: params?.turn ?? 0,
    cardDeck: params?.cardDeck ?? mockCardDeck(),
    goodTokens: params?.goodTokens ?? mockGoodTokens(),
    startPlayer: params?.startPlayer ?? Player.PLAYER
  }
}

export interface MockPhaseParams {
  round? : number
  phase? : Phase
  turn? : number
  cardDeck? : CardDeckPersistence
  goodTokens?: GoodTokensPersistence
  startPlayer?: Player
}
