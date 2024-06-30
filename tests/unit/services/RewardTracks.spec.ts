import { expect } from 'chai'
import Good from '@/services/enum/Good'
import RewardTracks from '@/services/RewardTracks'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

describe('services/RewardTracks', () => {
  it('new', () => {
    const tracks = RewardTracks.new()

    getAllEnumValues(Good).forEach(good => {
      expect(tracks.getTrack(good)).to.eq(0)
    })
  })

  it('increase', () => {
    const tracks = RewardTracks.fromPersistence({3: 1, 1: 4})

    expect(tracks.getTrack(Good.OLIVE_GRAIN)).to.eq(4)
    expect(tracks.getTrack(Good.GRAPE)).to.eq(0)
    expect(tracks.getTrack(Good.PIG)).to.eq(1)

    tracks.increaseTrack(Good.PIG)
    expect(tracks.getTrack(Good.PIG)).to.eq(2)

    expect(tracks.toPersistence()).to.eql({1: 4, 2: 0, 3: 2, 4: 0, 5: 0, 6: 0})

    expect(() => tracks.increaseTrack(Good.OLIVE_GRAIN)).to.throw('Reward track 1 is already at maximum value.')
  })
})
