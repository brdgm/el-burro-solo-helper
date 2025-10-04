import { CardDeckPersistence } from '@/store/state'

export default function mockCardDeck(params?: MockCardDeckParams) : CardDeckPersistence {
  return {
    roundPile: params?.roundPile ?? [],
    roundDiscard: params?.roundDiscard ?? [],
    auxiliaryPile: params?.auxiliaryPile ?? [],
    auxiliaryDiscard: params?.auxiliaryDiscard ?? []
  }
}

export interface MockCardDeckParams {
  roundPile?: string[]
  roundDiscard?: string[]
  auxiliaryPile?: string[]
  auxiliaryDiscard?: string[]
}
