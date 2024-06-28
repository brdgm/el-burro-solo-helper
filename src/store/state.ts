import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Player from '@/services/enum/Player'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.EASY,
        rewardDifficultyLevel: DifficultyLevel.EASY
      },
      turns: []
    } as State
  },
  actions: {
    resetGame() {
      this.setup.transportBonusTiles = undefined
      this.setup.startPlayer = undefined
      this.setup.gameRoundTiles = undefined
      this.setup.farmExtensionTiles = undefined
      this.turns = []
    },
    storeTurn(turn : Turn) {
      this.turns = this.turns.filter(item => item.turn < turn.turn)
      this.turns.push(turn)
    }
  },
  persist: true
})

export interface State {
  language: string,
  baseFontSize: number,
  setup: Setup,
  turns: Turn[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel,
  rewardDifficultyLevel: DifficultyLevel,
  transportBonusTiles?: number[],
  startPlayer?: Player,
  gameRoundTiles?: string[],
  farmExtensionTiles?: string[]
  debugMode?: boolean
}

export interface Turn {
  turn: number
}
