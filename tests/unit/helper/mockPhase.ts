import Phase from '@/services/enum/Phase'
import { CardDeckPersistence, GoodTokensPersistence, PhasePersistence, RewardTracksPersistence } from '@/store/state'
import mockCardDeck from './mockCardDeck'
import mockGoodTokens from './mockGoodTokens'

export default function (params?: MockPhaseParams) : PhasePersistence {
  return {
    round: params?.round ?? 1,
    phase: params?.phase ?? 1,
    cardDeck: params?.cardDeck ?? mockCardDeck(),
    rewardTracks: params?.rewardTracks ?? [],
    goodTokens: params?.goodTokens ?? mockGoodTokens()
  }
}

export interface MockPhaseParams {
  round? : number
  phase? : Phase
  cardDeck? : CardDeckPersistence
  rewardTracks? : RewardTracksPersistence
  goodTokens?: GoodTokensPersistence
}
