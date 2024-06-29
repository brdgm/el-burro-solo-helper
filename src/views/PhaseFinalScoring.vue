<template>
  <SideBar :navigationState="navigationState"/>

  <h1>
    <AppIcon type="phase" name="5" class="phase"/>
    {{t('phaseFinalScoring.title')}}
  </h1>

  <h4>
    <AppIcon type="phase-step" name="1" class="phase-step"/>
    {{t('phaseFinalScoring.rewardTracks.title')}}
  </h4>
  <ul>
    <li v-html="t('phaseFinalScoring.rewardTracks.trackConnections')"></li>
    <li v-html="t('phaseFinalScoring.rewardTracks.scoringOptions')"></li>
  </ul>

  <h4>
    <AppIcon type="phase-step" name="2" class="phase-step"/>
    {{t('phaseFinalScoring.specialFarmCards.title')}}
  </h4>
  <ul>
    <li v-html="t('phaseFinalScoring.specialFarmCards.scoreCards')"></li>
    <li v-html="t('phaseFinalScoring.specialFarmCards.gameEndMarketBarrows')"></li>
    <li v-html="t('phaseFinalScoring.specialFarmCards.gameEndScorings')"></li>
  </ul>

  <h4>
    <AppIcon type="phase-step" name="3" class="phase-step"/>
    {{t('phaseFinalScoring.harbor.title')}}
  </h4>
  <ul>
    <li v-html="t('phaseFinalScoring.harbor.claimHarbor')"></li>
    <li v-html="t('phaseFinalScoring.harbor.claimHarborException')"></li>
    <li v-html="t('phaseFinalScoring.harbor.remainingGoods')"></li>
  </ul>

  <h4>
    <AppIcon type="phase-step" name="4" class="phase-step"/>
    {{t('phaseFinalScoring.throughTrack.title')}}
  </h4>
  <ul>
    <li v-html="t('phaseFinalScoring.throughTrack.exchangeSteps')"></li>
  </ul>

  <h4>
    <AppIcon type="phase-step" name="5" class="phase-step"/>
    {{t('phaseFinalScoring.strikingWorkers.title')}}
  </h4>
  <ul>
    <li v-html="t('phaseFinalScoring.strikingWorkers.ignoreSteps')"></li>
  </ul>

  <p v-html="t('phaseFinalScoring.remainingStuff')"></p>

  <p class="fw-bold" v-html="t('phaseFinalScoring.determineWinner')"></p>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
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

export default defineComponent({
  name: 'PhaseFinalScoring',
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
    const navigationState = new NavigationState(route, Phase.FINAL_SCORING, state)
    const round = navigationState.round
    return { t, state, navigationState, round }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      return `/round/4/phase/scoring`
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
