import FarmExtensionTile from '@/services/FarmExtensionTile'
import FarmExtensionTiles from '@/services/FarmExtensionTiles'
import FarmExtensionShape from '@/services/enum/FarmExtensionShape'
import { shuffle } from 'lodash'

/**
 * Picks 3 random angular-shaped and 3 random round-shaped farm extension tiles.
 * @returns Farm extension tiles
 */
export default function randomFarmExtensionTiles() : FarmExtensionTile[] {
  const angularShaped = shuffle(FarmExtensionTiles.getByShape(FarmExtensionShape.ANGULAR))
  const roundShaped = shuffle(FarmExtensionTiles.getByShape(FarmExtensionShape.ROUND))
  return [...angularShaped, ...roundShaped]
}
