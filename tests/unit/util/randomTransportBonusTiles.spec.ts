import randomTransportBonusTiles from '@/util/randomTransportBonusTiles'
import { expect } from 'chai'

describe('util/randomTransportBonusTiles', () => {
  it('tiles', () => {
    const tiles = randomTransportBonusTiles()

    expect(tiles.length).to.eq(2)
    expect(tiles[0].id).to.not.eq(tiles[1].id)
  })
})
