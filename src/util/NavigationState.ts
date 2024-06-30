import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import { PhasePersistence, Setup, State } from '@/store/state'
import GameRoundTile from '@/services/GameRoundTile'
import GameRoundTiles from '@/services/GameRoundTiles'
import Phase from '@/services/enum/Phase'
import CardDeck from '@/services/CardDeck'
import TransportBonusTile from '@/services/TransportBonusTile'
import TransportBonusTiles from '@/services/TransportBonusTiles'
import Card from '@/services/Card'
import GoodTokens from '@/services/GoodTokens'
import Player from '@/services/enum/Player'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly phase : Phase
  readonly gameRoundTile? : GameRoundTile
  readonly transportBonusTile: TransportBonusTile
  readonly cardDeck : CardDeck
  readonly roundCard : Card
  readonly goodTokens : GoodTokens
  readonly startPlayer : Player
  readonly turnPlayer : Player

  public constructor(route: RouteLocation, phase: Phase, state: State) {
    this.round = getRound(route, phase)
    this.turn = getIntRouteParam(route, 'turn')
    this.phase = phase

    const setup = state.setup
    this.gameRoundTile = getGameRoundTile(setup, this.round, this.phase)
    this.transportBonusTile = getTransportBonusTile(setup, this.round)
    this.cardDeck = getCardDeck(state, this.round, this.phase, this.turn)

    if (this.cardDeck.currentRoundCard) {
      this.roundCard = this.cardDeck.currentRoundCard
    }
    else {
      this.roundCard = this.cardDeck.drawRound()
    }

    const phasePersistence = getPhasePersistence(state, this.round, this.phase, this.turn)
    if (phasePersistence) {
      this.goodTokens = GoodTokens.fromPersistence(phasePersistence.goodTokens)
      this.startPlayer = phasePersistence.startPlayer
    }
    else {
      this.goodTokens = GoodTokens.new()
      this.startPlayer = state.setup.startPlayer ?? Player.PLAYER
    }

    if (this.turn % 2 == 0) {
      this.turnPlayer = getAllEnumValues(Player).filter(player => player != this.startPlayer)[0]
    }
    else {
      this.turnPlayer = this.startPlayer
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
function getCardDeck(state: State, round: number, phase: Phase, turn: number) : CardDeck {
  // get from current or previous phase
  const phasePersistence = getPhasePersistence(state, round, phase, turn)
  if (phasePersistence) {
    const cardDeck = CardDeck.fromPersistence(phasePersistence.cardDeck)
    for (let phaseRound=phasePersistence.round; phaseRound<round; phaseRound++) {
      cardDeck.drawRound()
    }
    return cardDeck
  }
  // get from initial card state
  if (state.setup.initialCardDeck) {
    return CardDeck.fromPersistence(state.setup.initialCardDeck)
  }
  // should never happen
  return CardDeck.new(state.setup.difficultyLevel)
}

/**
 * Get phase persistence for previous phase or turn - if not found going further back phases and rounds.
 */
function getPhasePersistence(state: State, round: number, phase: Phase, turn: number) : PhasePersistence|undefined {
  const roundState = state.rounds.find(item => item.round == round)
  if (roundState) {
    const phasePersistence = roundState
        // sort descending by phase and turn
        .phases.toSorted((item1,item2) => getPersistenceIndex(item2) - getPersistenceIndex(item1))
        // get first matching item from previous turn or from previous phase
        .find(item => (item.phase == phase && item.turn < turn) || (item.phase < phase))
    if (phasePersistence) {
      return phasePersistence
    }
  }
  if (round > 1) {
    // get from previous round
    return getPhasePersistence(state, round-1, Phase.IV_SCORING, 0)
  }
  return undefined
}

function getPersistenceIndex(phasePersistence: PhasePersistence) : number {
  return phasePersistence.phase * 100 + phasePersistence.turn
}
