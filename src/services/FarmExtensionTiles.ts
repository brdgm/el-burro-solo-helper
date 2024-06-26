import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import FarmExtensionTile from './FarmExtensionTile'
import Action from './enum/Action'
import FarmExtensionShape from './enum/FarmExtensionShape'

/**
 * Solo farm extension tiles.
 */
const farmExtensionTiles : FarmExtensionTile[] = [
  {
    id: 'donkey-delivery-with-costs',
    shape: FarmExtensionShape.ANGULAR,
    thatchedRoofAction: Action.PAY_SILVER_1_DONKEY_DELIVERY_1,
    tiledRoofAction: Action.PAY_SILVER_1_DONKEY_DELIVERY_2
  },
  {
    id: 'travel-on-the-road',
    shape: FarmExtensionShape.ANGULAR,
    thatchedRoofAction: Action.PAY_SILVER_1_DONKEY_DELIVERY_1,
    tiledRoofAction: Action.PAY_SILVER_1_DONKEY_DELIVERY_2
  },
  {
    id: 'fill-through',
    shape: FarmExtensionShape.ANGULAR,
    thatchedRoofAction: Action.FILL_TROUGH_1,
    tiledRoofAction: Action.FILL_TROUGH_2
  },
  {
    id: 'play-a-farm-card',
    shape: FarmExtensionShape.ROUND,
    thatchedRoofAction: Action.PLAY_FARM_CARD,
    tiledRoofAction: Action.PLAY_FARM_CARD
  },
  {
    id: 'goat-delivery-with-costs',
    shape: FarmExtensionShape.ROUND,
    thatchedRoofAction: Action.PAY_SILVER_1_GOAT_DELIVERY_1,
    tiledRoofAction: Action.PAY_SILVER_1_GOAT_DELIVERY_2
  },
  {
    id: 'community-delivery-free-step-reward-track',
    shape: FarmExtensionShape.ROUND,
    thatchedRoofAction: Action.COMMUNITY_DELIVERY,
    tiledRoofAction: Action.REWARD_MARKER_MOVE_1
  }
]

const farmExtensionTilesMap = new Map<string,FarmExtensionTile>()
farmExtensionTiles.forEach(item => farmExtensionTilesMap.set(item.id, item))

export default {

  /**
   * Get transport bonus tile by ID
   * @param id ID
   * @returns Transport bonus tile
   */
  get(id: string) : FarmExtensionTile {
    return findMandatory(farmExtensionTilesMap, id)
  },

  /**
   * Get alle transport bonus tiles
   * @param shape Shape
   * @returns Transport bonus tiles
   */
  getByShape(shape: FarmExtensionShape) : FarmExtensionTile[] {
    return farmExtensionTiles.filter(tile => tile.shape === shape)
  }

}
