<template>
  <h4>
    <AppIcon type="phase-step" name="1" class="phase-step"/>
    {{t('roundPhaseTransport.donkeyCards.title')}}
  </h4>
  <p v-html="t('roundPhaseTransport.donkeyCards.botNoCards')"></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'TransportDonkeyCards',
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
  }
})
</script>

<style lang="scss" scoped>
.phase-step {
  height: 1.5rem;
  margin-top: -0.4rem
}
</style>
