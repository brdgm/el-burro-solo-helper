import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Player from '@/services/enum/Player'
import Phase from '@/services/enum/Phase'
import Good from '@/services/enum/Good'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.EASY,
        rewardDifficultyLevel: DifficultyLevel.EASY
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.setup.transportBonusTiles = undefined
      this.setup.startPlayer = undefined
      this.setup.gameRoundTiles = undefined
      this.setup.farmExtensionTiles = undefined
      this.rounds = []
    },
    storePhase(phase : PhasePersistence) {
      let round = this.rounds.find(item => item.round == phase.round)
      if (!round) {
        round = { round: phase.round, phases: [] }
        this.rounds = this.rounds.filter(item => item.round < phase.round)
        this.rounds.push(round)
      }
      round.phases = round.phases.filter(item => item.phase < phase.phase || (item.phase == phase.phase && item.turn < phase.turn))
      round.phases.push(phase)
    }
  },
  persist: true
})

export interface State {
  language: string,
  baseFontSize: number,
  setup: Setup,
  rounds: Round[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel,
  rewardDifficultyLevel: DifficultyLevel,
  transportBonusTiles?: number[],
  startPlayer?: Player,
  gameRoundTiles?: string[],
  farmExtensionTiles?: string[]
  initialCardDeck?: CardDeckPersistence
  debugMode?: boolean
}

export interface Round {
  round: number
  phases: PhasePersistence[]
}

export interface PhasePersistence {
  round: number
  phase: Phase
  turn: number
  cardDeck: CardDeckPersistence
  rewardTracks: RewardTracksPersistence
  goodTokens: GoodTokensPersistence
  startPlayer: Player
}

export interface CardDeckPersistence {
  roundPile: string[]
  roundDiscard: string[]
  auxiliaryPile: string[]
  auxiliaryDiscard: string[]
}

export interface RewardTracksPersistence {
  [track: number]: number
}

export interface GoodTokensPersistence {
  reserve: Good[]
  used: Good[]
}
