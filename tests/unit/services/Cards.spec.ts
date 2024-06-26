import Cards from '@/services/Cards'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get('R01')

    expect(card).not.undefined
    expect(card?.id).to.eq('R01')
  })

  it('getAll', () => {
    expect(Cards.getAll().length).to.eq(12)
  })
})
