import GameRoundTile from '@/services/GameRoundTile'
import GameRoundTiles from '@/services/GameRoundTiles'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'

/**
 * Picks a random tile from each round.
 * @returns Game round tiles
 */
export default function randomGameRoundTiles() : GameRoundTile[] {
  const result = [] as GameRoundTile[]
  for (let round = 1; round <= 4; round++) {
    const tiles = GameRoundTiles.getByRound(round)
    const index = rollDice(tiles.length) - 1
    result.push(tiles[index])
  }
  return result
}
