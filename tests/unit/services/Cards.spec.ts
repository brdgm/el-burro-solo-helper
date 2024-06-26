import Cards from '@/services/Cards'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get('R01')

    expect(card).not.undefined
    expect(card?.id).to.eq('R01')
  })

  it('getByDifficultyLevel', () => {
    Object.values(DifficultyLevel).forEach(difficultyLevel => {
      expect(Cards.getByDifficultyLevel(difficultyLevel).length).to.eq(4)
    });
  })
})
