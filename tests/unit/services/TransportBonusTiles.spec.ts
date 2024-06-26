import TransportBonusTiles from '@/services/TransportBonusTiles'
import { expect } from 'chai'

describe('services/TransportBonusTiles.spec', () => {
  it('get', () => {
    const tile = TransportBonusTiles.get(1)

    expect(tile).not.undefined
    expect(tile?.id).to.eq(1)
  })

  it('getAll', () => {
    expect(TransportBonusTiles.getAll().length).to.eq(3)
  })
})
