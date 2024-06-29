import FarmExtensionShape from '@/services/enum/FarmExtensionShape'
import randomFarmExtensionTiles from '@/util/randomFarmExtensionTiles'
import { expect } from 'chai'

describe('util/randomFarmExtensionTiles', () => {
  it('tiles', () => {
    const tiles = randomFarmExtensionTiles()

    expect(tiles.length).to.eq(6)
    for (let i = 0; i < tiles.length; i++) {
      if (i < 3) {
        expect(tiles[i].shape).to.eq(FarmExtensionShape.ANGULAR)
      }
      else {
        expect(tiles[i].shape).to.eq(FarmExtensionShape.ROUND)
      }
    }
  })
})
