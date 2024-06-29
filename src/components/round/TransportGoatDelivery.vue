<template>
  <h4>
    <AppIcon type="phase-step" name="3" class="phase-step"/>
    {{t('roundPhaseTransport.goatDelivery.title')}}
  </h4>

  <template v-if="isPlayer">
    <ul>
      <li v-html="t('roundPhaseTransport.takeYourTurn')"></li>
    </ul>
  </template>

  <template v-else>
    <ul>
      <li>
        <AppIcon type="action" name="goat-delivery" class="icon"/>
        <span v-html="t('roundPhaseTransport.goatDelivery.makeDelivery')"></span>
        <div>
          <GoatDelivery :navigationState="navigationState"/>          
        </div>
      </li>
      <li class="mt-4" v-if="roundCard.additionalGoatDelivery">
        <AppIcon name="transport-additional-goat-delivery" class="icon float-start"/>
        <span v-html="t('roundPhaseTransport.goatDelivery.additionalDelivery')"></span>
      </li>
    </ul>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'
import Player from '@/services/enum/Player'
import Card from '@/services/Card'
import GoatDelivery from './GoatDelivery.vue'

export default defineComponent({
  name: 'TransportGoatDelivery',
  components: {
    AppIcon,
    GoatDelivery
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
.icon {
  height: 3rem;
  margin-right: 0.5rem;
}
ul > li {
  margin-top: 1rem;
}
</style>
