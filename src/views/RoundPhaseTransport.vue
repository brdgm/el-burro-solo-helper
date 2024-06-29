<template>
  <SideBar :navigationState="navigationState"/>

  <h1>
    <AppIcon type="phase" name="3" class="phase"/>
    Transport Phase
  </h1>

  <ol>
    <li>Choose donkey cards</li>
    <li>Have a siesta</li>
    <li>Goat delivery</li>
    <li>Donkey delivery</li>
  </ol>

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
  name: 'RoundPhaseTransport',
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
    const navigationState = new NavigationState(route, Phase.III_TRANSPORT, state)
    const round = navigationState.round
    return { t, state, navigationState, round }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      return `/round/${this.round}/phase/revenue/turn/6`
    }
  },
  methods: {
    next() : void {
      storePhase(this.navigationState)
      this.$router.push(`/round/${this.round}/phase/scoring`)
    }
  }
})
</script>

<style lang="scss" scoped>
.phase {
  height: 3rem;
  margin-top: -0.5rem
}
ol > li {
  margin-top: 1rem;
}
</style>
