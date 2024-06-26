import FarmExtensionTiles from '@/services/FarmExtensionTiles'
import FarmExtensionShape from '@/services/enum/FarmExtensionShape'
import { expect } from 'chai'

describe('services/FarmExtensionTiles', () => {
  it('get', () => {
    const tile = FarmExtensionTiles.get('travel-on-the-road')

    expect(tile).not.undefined
    expect(tile?.id).to.eq('travel-on-the-road')
  })

  it('getByShape', () => {
    Object.values(FarmExtensionShape).forEach(shape => {
      expect(FarmExtensionTiles.getByShape(shape).length).to.eq(3)
    })
  })
})
