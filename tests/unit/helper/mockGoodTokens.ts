import Good from '@/services/enum/Good'
import { GoodTokensPersistence } from '@/store/state'

export default function (params?: MockGoodTokensParams) : GoodTokensPersistence {
  return {
    reserve: params?.reserve ?? [],
    used: params?.used ?? []
  }
}

export interface MockGoodTokensParams {
  reserve?: Good[]
  used?: Good[]
}
