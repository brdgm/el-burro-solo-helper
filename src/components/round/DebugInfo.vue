<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug">
      <b>gameRoundTile</b>: {{navigationState.gameRoundTile}}<br/>
      <b>transportBonusTile</b>: {{navigationState.transportBonusTile}}<br/>
      <b>cardDeck</b>: {{navigationState.cardDeck.toPersistence()}}<br/>
      <b>roundCard</b>: {{navigationState.roundCard}}
    </p>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'DebugInfo',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
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
.debug {
  font-size: small;
}
</style>
