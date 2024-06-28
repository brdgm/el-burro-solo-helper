import { Round, PhasePersistence } from '@/store/state'

export default function (params?: MockRoundParams) : Round {
  return {
    round: params?.round ?? 1,
    phases: params?.phases ?? []
  }
}

export interface MockRoundParams {
  round? : number
  phases? : PhasePersistence[]
}
