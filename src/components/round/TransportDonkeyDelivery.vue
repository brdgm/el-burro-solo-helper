<template>
  <h4>
    <AppIcon type="phase-step" name="4" class="phase-step"/>
    {{t('roundPhaseTransport.donkeyDelivery.title')}}
  </h4>

  <template v-if="isPlayer">
    <ul>
      <li v-html="t('roundPhaseTransport.takeYourTurn')"></li>
    </ul>
  </template>

  <template v-else>

  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'
import Player from '@/services/enum/Player'
import Card from '@/services/Card'

export default defineComponent({
  name: 'TransportDonkeyDelivery',
  components: {
    AppIcon
  },
  setup(props) {
    const { t } = useI18n()
    const round = props.navigationState.round
    const turn = props.navigationState.turn
    return { t, round, turn }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    isPlayer() : boolean {
      return this.navigationState.turnPlayer == Player.PLAYER
    },
    isBot() : boolean {
      return this.navigationState.turnPlayer == Player.BOT
    },
    roundCard() : Card {
      return this.navigationState.roundCard
    }
  }
})
</script>

<style lang="scss" scoped>
.phase-step {
  height: 1.5rem;
  margin-top: -0.4rem
}
ul > li {
  margin-top: 1rem;
}
</style>
