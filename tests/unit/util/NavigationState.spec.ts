import { expect } from 'chai'
import mockRouteLocation from '../helper/mockRouteLocation'
import NavigationState from '@/util/NavigationState'
import Phase from '@/services/enum/Phase'
import mockState from '../helper/mockState'
import mockCardDeck from '../helper/mockCardDeck'
import mockRound from '../helper/mockRound'
import mockPhase from '../helper/mockPhase'

describe('util/NavigationSTate', () => {
  it('round-farm-phase', () => {
    const navigationState = new NavigationState(mockRouteLocation({params:{'round':'1'}}),Phase.I_FARM, mockState())
    expect(navigationState.round).to.eq(1)
  })

  it('round-final-scoring', () => {
    const navigationState = new NavigationState(mockRouteLocation(),Phase.FINAL_SCORING, mockState())
    expect(navigationState.round).to.eq(4)
  })

  it('game-round-tile-matching', () => {
    const navigationState = new NavigationState(mockRouteLocation({params:{'round':'2'}}),Phase.III_TRANSPORT,
      mockState({gameRoundTiles:['1-double-plus-cheaper','2-market-barrow-scoring-gain-prestige']}))
    expect(navigationState.gameRoundTile?.id).to.eq('2-market-barrow-scoring-gain-prestige')
  })

  it('game-round-tile-matching-any', () => {
    const navigationState = new NavigationState(mockRouteLocation({params:{'round':'2'}}),Phase.IV_SCORING,
      mockState({gameRoundTiles:['1-double-plus-cheaper','2-goat-delivery-prestige']}))
    expect(navigationState.gameRoundTile?.id).to.eq('2-goat-delivery-prestige')
  })

  it('game-round-tile-not-matching', () => {
    const navigationState = new NavigationState(mockRouteLocation({params:{'round':'2'}}),Phase.I_FARM,
      mockState({gameRoundTiles:['1-double-plus-cheaper','2-market-barrow-scoring-gain-prestige']}))
    expect(navigationState.gameRoundTile).to.undefined
  })

  it('transport-bonus-round-1', () => {
    const navigationState = new NavigationState(mockRouteLocation({params:{'round':'1'}}),Phase.I_FARM,
      mockState({transportBonusTiles:[1,2]}))
    expect(navigationState.transportBonusTile.id).to.eq(1)
  })

  it('transport-bonus-round-3', () => {
    const navigationState = new NavigationState(mockRouteLocation({params:{'round':'3'}}),Phase.I_FARM,
      mockState({transportBonusTiles:[1,2]}))
    expect(navigationState.transportBonusTile.id).to.eq(2)
  })

  const CARD_STATE = mockState({
    initialCardDeck: mockCardDeck({roundPile:['R09','R10','R11','R12'],auxiliaryPile:['R01','R02','R03','R04']}),
    rounds: [
      mockRound({round:1,phases:[
        mockPhase({round:1,phase:Phase.I_FARM,cardDeck:mockCardDeck({roundPile:['R10','R11','R12'],roundDiscard:['R09'],auxiliaryPile:['R02','R03','R04'],auxiliaryDiscard:['R01']})}),
        mockPhase({round:1,phase:Phase.II_REVENUE,cardDeck:mockCardDeck({roundPile:['R10','R11','R12'],roundDiscard:['R09'],auxiliaryPile:['R03','R04'],auxiliaryDiscard:['R02','R01']})}),
        mockPhase({round:1,phase:Phase.III_TRANSPORT,cardDeck:mockCardDeck({roundPile:['R10','R11','R12'],roundDiscard:['R09'],auxiliaryPile:['R04'],auxiliaryDiscard:['R03','R02','R01']})}),
        mockPhase({round:1,phase:Phase.IV_SCORING,cardDeck:mockCardDeck({roundPile:['R10','R11','R12'],roundDiscard:['R09'],auxiliaryDiscard:['R04','R03','R02','R01']})})
      ]}),
      mockRound({round:2,phases:[
        mockPhase({round:2,phase:Phase.I_FARM,cardDeck:mockCardDeck({roundPile:['R11','R12'],roundDiscard:['R10','R09'],auxiliaryPile:['R04','R01','R03'],auxiliaryDiscard:['R02']})}),
        mockPhase({round:2,phase:Phase.II_REVENUE,turn:1,cardDeck:mockCardDeck({roundPile:['R11','R12'],roundDiscard:['R10','R09'],auxiliaryPile:['R01','R03'],auxiliaryDiscard:['R04','R02']})}),
        mockPhase({round:2,phase:Phase.II_REVENUE,turn:2,cardDeck:mockCardDeck({roundPile:['R11','R12'],roundDiscard:['R10','R09'],auxiliaryPile:['R03'],auxiliaryDiscard:['R01','R04','R02']})}),
        mockPhase({round:2,phase:Phase.II_REVENUE,turn:3,cardDeck:mockCardDeck({roundPile:['R11','R12'],roundDiscard:['R10','R09'],auxiliaryPile:['R02','R03','R01'],auxiliaryDiscard:['R04',]})})
      ]})
    ]
  })

  it('card-deck-matching-round-matching-phase', () => {
    const navigationState = new NavigationState(mockRouteLocation({params:{'round':'2','turn':'1'}}),Phase.II_REVENUE,CARD_STATE)
    expect(navigationState.cardDeck.toPersistence().auxiliaryPile).to.eql(['R04','R01','R03'])
  })

  it('card-deck-matching-round-matching-phase-matching-turn', () => {
    const navigationState = new NavigationState(mockRouteLocation({params:{'round':'2','turn':'3'}}),Phase.II_REVENUE,CARD_STATE)
    expect(navigationState.cardDeck.toPersistence().auxiliaryPile).to.eql(['R03'])
  })

  it('card-deck-matching-round-previous-phase', () => {
    const navigationState = new NavigationState(mockRouteLocation({params:{'round':'2'}}),Phase.IV_SCORING,CARD_STATE)
    expect(navigationState.cardDeck.toPersistence().auxiliaryPile).to.eql(['R02','R03','R01'])
  })

  it('card-deck-previous-round-previous-phase', () => {
    const navigationState = new NavigationState(mockRouteLocation({params:{'round':'4'}}),Phase.I_FARM,CARD_STATE)
    expect(navigationState.cardDeck.toPersistence().auxiliaryPile).to.eql(['R02','R03','R01'])
    expect(navigationState.cardDeck.toPersistence().roundDiscard).to.eql(['R12','R11','R10','R09'])
  })

  it('card-deck-initial', () => {
    const navigationState = new NavigationState(mockRouteLocation({params:{'round':'0'}}),Phase.I_FARM,CARD_STATE)
    expect(navigationState.cardDeck.toPersistence().auxiliaryPile).to.eql(['R01','R02','R03','R04'])
  })
})
