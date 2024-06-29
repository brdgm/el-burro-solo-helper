import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import { Setup, State } from '@/store/state'
import GameRoundTile from '@/services/GameRoundTile'
import GameRoundTiles from '@/services/GameRoundTiles'
import Phase from '@/services/enum/Phase'
import CardDeck from '@/services/CardDeck'
import TransportBonusTile from '@/services/TransportBonusTile'
import TransportBonusTiles from '@/services/TransportBonusTiles'
import Card from '@/services/Card'

export default class NavigationState {

  readonly round : number
  readonly phase : Phase
  readonly gameRoundTile? : GameRoundTile
  readonly transportBonusTile: TransportBonusTile
  readonly cardDeck : CardDeck
  readonly roundCard : Card

  public constructor(route: RouteLocation, phase: Phase, state: State) {
    this.round = getRound(route, phase)
    this.phase = phase

    const setup = state.setup
    this.gameRoundTile = getGameRoundTile(setup, this.round, this.phase)
    this.transportBonusTile = getTransportBonusTile(setup, this.round)
    this.cardDeck = getCardDeck(state, this.round, this.phase)

    if (this.cardDeck.currentRoundCard) {
      this.roundCard = this.cardDeck.currentRoundCard
    }
    else {
      this.roundCard = this.cardDeck.drawRound()
    }
  }

}

function getRound(route: RouteLocation, phase: Phase) : number {
  if (phase == Phase.FINAL_SCORING) {
    return 4
  }
  return getIntRouteParam(route, 'round')
}

/**
 * Get current game round tile if it matches the current phase.
 */
function getGameRoundTile(setup: Setup, round: number, phase: Phase) : GameRoundTile|undefined {
  const gameRoundTileId = setup.gameRoundTiles?.[round-1]
  if (gameRoundTileId) {
    const tile = GameRoundTiles.get(gameRoundTileId)
    if (tile.phase == undefined || tile.phase.includes(phase)) {
      return tile
    }
  }
  return undefined
}

/**
 * Get transport the matching transport bonus tile for the current round.
 */
function getTransportBonusTile(setup: Setup, round: number) : TransportBonusTile {
  let tileId
  if (round < 3) {
    tileId = setup.transportBonusTiles?.[0]
  }
  else {
    tileId = setup.transportBonusTiles?.[1]
  }
  if (tileId) {
    return TransportBonusTiles.get(tileId)
  }
  else {
    // should never happen
    return TransportBonusTiles.getAll()[0]
  }
}

/**
 * Get card deck for current round and phase - if not found going back phases and rounds
 * up to the initial card deck.
 */
function getCardDeck(state: State, round: number, phase: Phase) : CardDeck {
  const roundState = state.rounds.find(item => item.round == round)
  if (roundState) {
    const phaseState = roundState.phases
      .toSorted((item1,item2) => item2.phase - item1.phase)  // sort descending
      .find(item => item.phase <= phase)  // get first matching phase item
    if (phaseState) {
      return CardDeck.fromPersistence(phaseState.cardDeck)
    }
  }
  if (round > 1) {
    // get from previous round
    const cardDeck = getCardDeck(state, round-1, Phase.IV_SCORING)
    cardDeck.drawRound()
    return cardDeck
  }
  // get from initial card state
  if (state.setup.initialCardDeck) {
    const cardDeck = CardDeck.fromPersistence(state.setup.initialCardDeck)
    cardDeck.drawRound()
    return cardDeck
  }
  // should never happen
  return CardDeck.new(state.setup.difficultyLevel)
}
