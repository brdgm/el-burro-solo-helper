import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import GameRoundTile from './GameRoundTile'
import Phase from './enum/Phase'

/**
 * Game round tiles.
 */
const gameRoundTiles : GameRoundTile[] = [
  {
    id: 'community-die-bonus',
    round: 1,
    phase: [Phase.II_REVENUE]
  },
  {
    id: 'double-plus-cheaper',
    round: 1,
    phase: [Phase.III_TRANSPORT]
  },
  {
    id: 'siesta-markers-reduce-2',
    round: 1,
    phase: [Phase.IV_SCORING]
  },
  {
    id: 'market-barrow-scoring-move-road',
    round: 1,
    phase: [Phase.II_REVENUE,Phase.III_TRANSPORT]
  },
  {
    id: 'goat-delivery-prestige',
    round: 2
  },
  {
    id: 'trough-harvest-good',
    round: 2
  },
  {
    id: 'additional-farm-card',
    round: 2,
    phase: [Phase.I_FARM]
  },
  {
    id: 'market-barrow-scoring-gain-prestige',
    round: 2,
    phase: [Phase.II_REVENUE,Phase.III_TRANSPORT]
  },
  {
    id: 'income-twice',
    round: 3,
    phase: [Phase.I_FARM]
  },
  {
    id: 'first-die-double-income',
    round: 3,
    phase: [Phase.II_REVENUE]
  },
  {
    id: 'prestige-paid-workers',
    round: 3,
    phase: [Phase.IV_SCORING]
  },
  {
    id: 'local-market-scoring-prestige',
    round: 3,
    phase: [Phase.II_REVENUE,Phase.III_TRANSPORT]
  },
  {
    id: 'siesta-space-9-prestige',
    round: 4
  },
  {
    id: 'stable-scoring-prestige',
    round: 4,
    phase: [Phase.IV_SCORING]
  },
  {
    id: 'harbor-prestige',
    round: 4,
    phase: [Phase.II_REVENUE,Phase.III_TRANSPORT]
  },
  {
    id: 'final-scoring-play-farm-card',
    round: 4,
    phase: [Phase.FINAL_SCORING]
  }
]

const gameRoundTilesMap = new Map<string,GameRoundTile>()
gameRoundTiles.forEach(item => gameRoundTilesMap.set(item.id, item))

export default {

  /**
   * Get game round tile by ID
   * @param id ID
   * @returns Game round tile
   */
  get(id: string) : GameRoundTile {
    return findMandatory(gameRoundTilesMap, id)
  },

  /**
   * Get game round tiles by round
   * @param round Round
   * @returns Game round tiles
   */
  getByRound(round: number) : GameRoundTile[] {
    return gameRoundTiles.filter(item => item.round === round)
  }

}
