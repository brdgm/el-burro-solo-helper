import Phase from '@/services/enum/Phase'
import { CardDeckPersistence, GoodTokensPersistence, PhasePersistence, RewardTracksPersistence } from '@/store/state'
import mockCardDeck from './mockCardDeck'
import mockGoodTokens from './mockGoodTokens'
import Player from '@/services/enum/Player'

export default function (params?: MockPhaseParams) : PhasePersistence {
  return {
    round: params?.round ?? 1,
    phase: params?.phase ?? Phase.I_FARM,
    turn: params?.turn ?? 0,
    cardDeck: params?.cardDeck ?? mockCardDeck(),
    rewardTracks: params?.rewardTracks ?? [],
    goodTokens: params?.goodTokens ?? mockGoodTokens(),
    startPlayer: params?.startPlayer ?? Player.PLAYER
  }
}

export interface MockPhaseParams {
  round? : number
  phase? : Phase
  turn? : number
  cardDeck? : CardDeckPersistence
  rewardTracks? : RewardTracksPersistence
  goodTokens?: GoodTokensPersistence
  startPlayer?: Player
}
