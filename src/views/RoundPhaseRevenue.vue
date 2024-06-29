<template>
  <SideBar :navigationState="navigationState"/>

  <h1>
    <AppIcon type="phase" name="2" class="phase"/>
    Revenue Phase
  </h1>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'
import Phase from '@/services/enum/Phase'
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'
import storePhase from '@/util/storePhase'

export default defineComponent({
  name: 'RoundPhaseRevenue',
  components: {
    FooterButtons,
    AppIcon,
    SideBar,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, Phase.II_REVENUE, state)
    const round = navigationState.round
    const turn = navigationState.turn
    return { t, state, navigationState, round, turn }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      if (this.turn > 1) {
        return `/round/${this.round}/phase/revenue/turn/${this.turn-1}`
      }
      else {
        return `/round/${this.round}/phase/farm`
      }
    }
  },
  methods: {
    next() : void {
      storePhase(this.navigationState)
      if (this.turn < 6) {
        this.$router.push(`/round/${this.round}/phase/revenue/turn/${this.turn+1}`)
      }
      else {
        this.$router.push(`/round/${this.round}/phase/transport`)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.phase {
  height: 3rem;
  margin-top: -0.5rem
}
</style>
