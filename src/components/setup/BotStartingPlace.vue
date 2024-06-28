<template>
  <p class="mt-2" v-html="t(`setupBot.startingSpaceOption.${startingPosition}`)"></p>
  <button class="btn btn-secondary" @click="notPossible()">{{t('setupBot.spaceBlocked')}}</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardDeckPersistence, useStateStore } from '@/store/state'
import CardDeck from '@/services/CardDeck'
import Card from '@/services/Card'
import DiceModification from '@/services/enum/DiceModification'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

export default defineComponent({
  name: 'BotStartingPlace',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const card = gerAuxiliaryCard(state.setup.initialCardDeck)
    const diceModification = card.diceModification
    const startingPosition = ref(getStartingPosition(card))

    return { t, state, diceModification, startingPosition }
  },
  methods: {
    notPossible() {
      if (this.diceModification == DiceModification.UP) {
        if (this.startingPosition == 5) {
          this.startingPosition = 1
        }
        else {
          this.startingPosition++
        }
      }
      else {
        if (this.startingPosition == 1) {
          this.startingPosition = 5
        }
        else {
          this.startingPosition--
        }
      }
    }
  }
})

function gerAuxiliaryCard(cardDeckPersistence? : CardDeckPersistence) {
  let cardDeck : CardDeck
  if (cardDeckPersistence) {
    cardDeck = CardDeck.fromPersistence(cardDeckPersistence)
  }
  else {
    cardDeck = CardDeck.new(DifficultyLevel.RANDOM)
  }
  let card = cardDeck.currentAuxiliaryCard
  if (!card) {
    card = cardDeck.drawAuxiliary()
  }
  return card
}

function getStartingPosition(card : Card) {
  if (card.diceValue == 6) {
    if (card.diceModification == DiceModification.UP) {
      return 1
    }
    else {
      return 5
    }
  }
  return card.diceValue
}
</script>
