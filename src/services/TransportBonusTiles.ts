import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import TransportBonusTile from './TransportBonusTile'
import Action from './enum/Action'

/**
 * Transport bonus tiles
 */
const transportBonusTiles : TransportBonusTile[] = [
  {
    id: 1,
    action: {
      1: Action.COMMUNITY_DELIVERY,
      2: Action.TRAVEL_ROAD_2,
      3: Action.TAKE_SILVER_2
    }
  },
  {
    id: 2,
    action: {
      1: Action.PLAY_FARM_CARD,
      2: Action.PAY_SILVER_1_DONKEY_DELIVERY_1,
      3: Action.TAKE_FARM_GOOD_1
    }
  },
  {
    id: 3,
    action: {
      1: Action.HIRE_WORKER,
      2: Action.TAKE_FARM_GOOD_1_SILVER_1,
      3: Action.FILL_TROUGH_1
    }
  }
]

const transportBonusTilesMap = new Map<number,TransportBonusTile>()
transportBonusTiles.forEach(item => transportBonusTilesMap.set(item.id, item))

export default {

  /**
   * Get transport bonus tile by ID
   * @param id ID
   * @returns Transport bonus tile
   */
  get(id: number) : TransportBonusTile {
    return findMandatory(transportBonusTilesMap, id)
  },

  /**
   * Get alle transport bonus tiles
   * @returns Transport bonus tiles
   */
  getAll() : TransportBonusTile[] {
    return transportBonusTiles
  }

}
