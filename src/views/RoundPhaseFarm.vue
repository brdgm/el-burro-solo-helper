<template>
  <SideBar :navigationState="navigationState"/>

  <h1>
    <AppIcon type="phase" name="1" class="phase"/>
    {{t('roundPhaseFarm.title')}}
  </h1>

  <h4>
    <AppIcon type="phase-step" name="1" class="phase-step"/>
    {{t('roundPhaseFarm.gameRoundTile.title')}}
  </h4>
  <ul>
    <li v-html="t('roundPhaseFarm.gameRoundTile.appliesBot')"></li>
  </ul>

  <h4>
    <AppIcon type="phase-step" name="2" class="phase-step"/>
    {{t('roundPhaseFarm.expandFarm.title')}}
  </h4>
  <ul>
    <li>
      <PlayFarmCard :navigationState="navigationState"/>
    </li>
  </ul>

  <h4>
    <AppIcon type="phase-step" name="3" class="phase-step"/>
    {{t('roundPhaseFarm.increaseFarm.title')}}
  </h4>
  <ul>
    <li v-html="t('roundPhaseFarm.increaseFarm.gainIncome')"></li>
    <li v-html="t('roundPhaseFarm.increaseFarm.harvest')"></li>
    <li v-html="t('roundPhaseFarm.increaseFarm.gainOffspring')"></li>
  </ul>

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
import PlayFarmCard from '@/components/round/PlayFarmCard.vue'
import storePhase from '@/util/storePhase'

export default defineComponent({
  name: 'RoundPhaseFarm',
  components: {
    FooterButtons,
    PlayFarmCard,
    AppIcon,
    SideBar,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, Phase.I_FARM, state)
    const round = navigationState.round
    return { t, state, navigationState, round }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      if (this.round > 1) {
        return `/round/${this.round-1}/phase/scoring`
      }
      else {
        return undefined
      }
    }
  },
  methods: {
    next() : void {
      storePhase(this.navigationState)
      this.$router.push(`/round/${this.round}/phase/revenue/turn/1`)
    }
  }
})
</script>

<style lang="scss" scoped>
.phase {
  height: 3rem;
  margin-top: -0.5rem
}
.phase-step {
  height: 1.5rem;
  margin-top: -0.4rem
}
</style>
