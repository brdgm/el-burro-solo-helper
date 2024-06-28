import TransportBonusTile from '@/services/TransportBonusTile'
import TransportBonusTiles from '@/services/TransportBonusTiles'
import rollDiceMultiDifferentValue from '@brdgm/brdgm-commons/src/util/random/rollDiceMultiDifferentValue'

/**
 * Picks two random transport bonus tiles.
 * @returns Transport bonus tiles
 */
export default function randomTransportBonusTiles() : TransportBonusTile[] {
  const tiles = TransportBonusTiles.getAll()
  const indexes = rollDiceMultiDifferentValue(tiles.length, 2)
  return indexes.map(index => tiles[index-1])
}
