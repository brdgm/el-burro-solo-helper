import { clone } from 'lodash'
import { GoodTokensPersistence } from '@/store/state'
import Good from './enum/Good'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

/**
 * Good tokens for goat/community deliveries.
 */
export default class GoodTokens {

  private _reserve : Good[]
  private _used : Good[]

  public constructor(reserve : Good[], used : Good[]) {
    this._reserve = reserve
    this._used = used
  }

  public get reserve() : readonly Good[] {
    return this._reserve
  }

  public get used() : readonly Good[] {
    return this._used
  }

  /**
   * @param good Uses a good for goat/community delivery
   */
  public use(good : Good) : void {
    if (!this._reserve.includes(good)) {
      throw new Error(`Good is already in use.`)
    }
    this._reserve = this._reserve.filter(g => g != good)
    this._used.push(good)
  }

  /**
   * Gets persistence view.
   */
  public toPersistence() : GoodTokensPersistence {
    return {
      reserve: clone(this._reserve),
      used: clone(this._used)
    }
  }

  /**
   * Creates new.
   */
  public static new() : GoodTokens {
    const reserve : Good[] = getAllEnumValues(Good)
    const used : Good[] = []
    return new GoodTokens(reserve, used)
  }

  /**
   * Re-creates from persistence.
   */
  public static fromPersistence(persistence : GoodTokensPersistence) : GoodTokens {
    return new GoodTokens(
      clone(persistence.reserve),
      clone(persistence.used)
    )
  }

}
