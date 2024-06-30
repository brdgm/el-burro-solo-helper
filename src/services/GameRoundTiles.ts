import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import GameRoundTile from './GameRoundTile'
import Phase from './enum/Phase'

/**
 * Game round tiles.
 */
const gameRoundTiles : GameRoundTile[] = [
  {
    id: '1-community-die-bonus',
    round: 1,
    phase: [Phase.II_REVENUE]
  },
  {
    id: '1-double-plus-cheaper',
    round: 1,
    phase: [Phase.III_TRANSPORT]
  },
  {
    id: '1-siesta-markers-reduce-2',
    round: 1,
    phase: [Phase.IV_SCORING]
  },
  {
    id: '1-market-barrow-scoring-move-road',
    round: 1,
    phase: [Phase.II_REVENUE,Phase.III_TRANSPORT]
  },
  {
    id: '2-goat-delivery-prestige',
    round: 2
  },
  {
    id: '2-trough-harvest-good',
    round: 2
  },
  {
    id: '2-additional-farm-card',
    round: 2,
    phase: [Phase.I_FARM]
  },
  {
    id: '2-market-barrow-scoring-gain-prestige',
    round: 2,
    phase: [Phase.II_REVENUE,Phase.III_TRANSPORT]
  },
  {
    id: '3-income-twice',
    round: 3,
    phase: [Phase.I_FARM]
  },
  {
    id: '3-first-die-double-income',
    round: 3,
    phase: [Phase.II_REVENUE]
  },
  {
    id: '3-prestige-paid-workers',
    round: 3,
    phase: [Phase.IV_SCORING]
  },
  {
    id: '3-local-market-scoring-prestige',
    round: 3,
    phase: [Phase.II_REVENUE,Phase.III_TRANSPORT]
  },
  {
    id: '4-siesta-space-9-prestige',
    round: 4
  },
  {
    id: '4-stable-scoring-prestige',
    round: 4,
    phase: [Phase.IV_SCORING]
  },
  {
    id: '4-harbor-prestige',
    round: 4,
    phase: [Phase.II_REVENUE,Phase.III_TRANSPORT]
  },
  {
    id: '4-final-scoring-play-farm-card',
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
