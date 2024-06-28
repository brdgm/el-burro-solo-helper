import Phase from '@/services/enum/Phase'
import { CardDeckPersistence, PhasePersistence } from '@/store/state'
import mockCardDeck from './mockCardDeck'

export default function (params?: MockPhaseParams) : PhasePersistence {
  return {
    round: params?.round ?? 1,
    phase: params?.phase ?? 1,
    cardDeck: params?.cardDeck ?? mockCardDeck()
  }
}

export interface MockPhaseParams {
  round? : number
  phase? : Phase
  cardDeck? : CardDeckPersistence
}
