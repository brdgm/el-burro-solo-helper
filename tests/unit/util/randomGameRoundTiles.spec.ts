import randomGameRoundTiles from '@/util/randomGameRoundTiles'
import { expect } from 'chai'

describe('util/randomGameRoundTiles', () => {
  it('tiles', () => {
    const tiles = randomGameRoundTiles()

    expect(tiles.length).to.eq(4)
    for (let round = 1; round <= 4; round++) {
      expect(tiles[round-1].round).to.eq(round)
    }
  })
})
