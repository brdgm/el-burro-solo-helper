import { clone } from 'lodash'
import { GoodTokensPersistence } from '@/store/state'
import Good from './enum/Good'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import { ref } from 'vue'

/**
 * Good tokens for goat/community deliveries.
 */
export default class GoodTokens {

  private _reserve
  private _used

  public constructor(reserve : Good[], used : Good[]) {
    this._reserve = ref(reserve)
    this._used = ref(used)
  }

  public get reserve() : readonly Good[] {
    return this._reserve.value
  }

  public get used() : readonly Good[] {
    return this._used.value
  }

  /**
   * Uses a good for goat/community delivery
   */
  public use(good : Good) : void {
    if (!this._reserve.value.includes(good)) {
      throw new Error(`Good is already in use.`)
    }
    this._reserve.value = this._reserve.value.filter(g => g != good)
    this._used.value.push(good)
  }

  /**
   * Removes a good from the list of used goods - it will be ignored in future deliveries.
   */
  public remove(good : Good) : void {
    if (this._used.value.includes(good)) {
      this._used.value = this._used.value.filter(g => g != good)
    }
    else {
      throw new Error(`Good is not in use.`)
    }
  }

  /**
   * Gets persistence view.
   */
  public toPersistence() : GoodTokensPersistence {
    return {
      reserve: clone(this._reserve.value),
      used: clone(this._used.value)
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
