import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Player from '@/services/enum/Player'
import { CardDeckPersistence, Round, State } from '@/store/state'

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      difficultyLevel: params?.difficultyLevel ?? DifficultyLevel.EASY,
      rewardDifficultyLevel: params?.rewardDifficultyLevel ?? DifficultyLevel.EASY,
      transportBonusTiles: params?.transportBonusTiles,
      startPlayer: params?.startPlayer,
      gameRoundTiles: params?.gameRoundTiles,
      farmExtensionTiles: params?.farmExtensionTiles,
      initialCardDeck: params?.initialCardDeck
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  difficultyLevel?: DifficultyLevel
  rewardDifficultyLevel?: DifficultyLevel
  transportBonusTiles?: number[],
  startPlayer?: Player,
  gameRoundTiles?: string[],
  farmExtensionTiles?: string[]
  initialCardDeck?: CardDeckPersistence
  rounds?: Round[]
}
