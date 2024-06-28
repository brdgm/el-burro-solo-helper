import GameRoundTiles from '@/services/GameRoundTiles'
import { expect } from 'chai'

describe('services/GameRoundTiles', () => {
  it('get', () => {
    const tile = GameRoundTiles.get('1-community-die-bonus')

    expect(tile).not.undefined
    expect(tile?.id).to.eq('1-community-die-bonus')
  })

  it('getByShape', () => {
    [1,2,3,4].forEach(round => {
      expect(GameRoundTiles.getByRound(round).length).to.eq(4)
    })
  })
})
