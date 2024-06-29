import { expect } from 'chai'
import GoodTokens from '@/services/GoodTokens'
import Good from '@/services/enum/Good'

describe('services/GoodTokens', () => {
  it('new', () => {
    const goodTokens = GoodTokens.new()

    expect(goodTokens.reserve.length).to.eq(6)
    expect(goodTokens.used.length).to.eq(0)
  })

  it('use-remove', () => {
    const goodTokens = GoodTokens.fromPersistence({reserve: [Good.OLIVE_GRAIN,Good.GRAPE,Good.WINE], used: [Good.PIG]})

    goodTokens.use(Good.GRAPE)
    goodTokens.remove(Good.PIG)

    const persistence = goodTokens.toPersistence()
    expect(persistence.reserve).to.eql([Good.OLIVE_GRAIN,Good.WINE])
    expect(persistence.used).to.eql([Good.GRAPE])

    expect(() => goodTokens.use(Good.GRAPE)).to.throw('Good is already in use.')
    expect(() => goodTokens.remove(Good.FOOD)).to.throw('Good is not in use.')
  })
})
