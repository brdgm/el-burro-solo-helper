import NavigationState from './NavigationState'
import { PhasePersistence, useStateStore } from '@/store/state'

/**
 * Persists the state of the current phase.
 */
export default function storePhase(navigationState : NavigationState) : void {
  const state = useStateStore()
  const phase : PhasePersistence = {
    round: navigationState.round,
    phase: navigationState.phase,
    cardDeck: navigationState.cardDeck.toPersistence(),
    rewardTracks: navigationState.rewardTracks.toPersistence(),
    goodTokens: navigationState.goodTokens.toPersistence()
  }
  state.storePhase(phase)
}
