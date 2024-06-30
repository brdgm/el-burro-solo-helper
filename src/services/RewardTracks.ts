import { RewardTracksPersistence } from '@/store/state'
import Good from './enum/Good'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

/**
 * Reward Tracks
 */
export default class RewardTracks {

  private _tracks : Map<Good,number>

  public constructor(tracks : Map<Good,number>) {
    this._tracks = tracks
  }

  /**
   * Get current track progress.
   */
  public getTrack(track: Good) : number {
    return this._tracks.get(track) ?? 0
  }

  /**
   * Increase track progress.
   */
  public increaseTrack(track : Good) : void {
    let value = this.getTrack(track)
    if (value >= 4) {
      throw new Error(`Reward track ${track} is already at maximum value.`)
    }
    value++
    this._tracks.set(track, value)
  }

  /**
   * Gets persistence view.
   */
  public toPersistence() : RewardTracksPersistence {
    const persistence : RewardTracksPersistence = {}
    this._tracks.forEach((value, key) => {
      persistence[key] = value
    })
    return persistence
  }

  /**
   * Creates new.
   */
  public static new() : RewardTracks {
    const map = new Map<Good,number>()
    getAllEnumValues(Good).forEach(good => {
      map.set(good, 0)
    })
    return new RewardTracks(map)
  }

  /**
   * Re-creates from persistence.
   */
  public static fromPersistence(persistence : RewardTracksPersistence) : RewardTracks {
    const map = new Map<Good,number>()
    getAllEnumValues(Good).forEach(good => {
      map.set(good, persistence[good] ?? 0)
    })
    return new RewardTracks(map)
  }

}
