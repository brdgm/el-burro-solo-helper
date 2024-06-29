<template>
  <SideBar :navigationState="navigationState"/>

  <h1>
    <AppIcon type="phase" name="4" class="phase"/>
    {{t('roundPhaseScoring.title')}}
  </h1>

  <h4>
    <AppIcon type="phase-step" name="1" class="phase-step"/>
    {{t('roundPhaseScoring.milestones.title')}}
  </h4>
  <ul>
    <li v-html="t('roundPhaseScoring.milestones.gainPrestige')"></li>
  </ul>

  <h4>
    <AppIcon type="phase-step" name="2" class="phase-step"/>
    {{t('roundPhaseScoring.stable.title')}}
  </h4>
  <ul>
    <li v-html="t('roundPhaseScoring.stable.totalValue', {value:stableTotalValue,count:allGameRoundCards.length}, allGameRoundCards.length)"></li>
    <li v-html="t('roundPhaseScoring.stable.compareTotalValue')"></li>
    <ul>
      <li v-html="t('roundPhaseScoring.stable.gainPrestigePlace1', {value:prestigePlace1}, prestigePlace1)"></li>
      <li v-html="t('roundPhaseScoring.stable.gainPrestigePlace2', {value:prestigePlace2}, prestigePlace2)"></li>
    </ul>
    <li v-html="t('roundPhaseScoring.stable.tieBreaker')"></li>
  </ul>

  <h4>
    <AppIcon type="phase-step" name="3" class="phase-step"/>
    {{t('roundPhaseScoring.supportMarkers.title')}}
  </h4>
  <ul>
    <li v-html="t('roundPhaseScoring.supportMarkers.gainPrestige')"></li>
  </ul>

  <h4>
    <AppIcon type="phase-step" name="4" class="phase-step"/>
    {{t('roundPhaseScoring.payWorkers.title')}}
  </h4>
  <ul>
    <li v-html="t('roundPhaseScoring.payWorkers.paySilver')"></li>
    <li v-html="t('roundPhaseScoring.payWorkers.losePrestige')"></li>
  </ul>

  <template v-if="round < 4">
    <h4>
      <AppIcon type="phase-step" name="5" class="phase-step"/>
      {{t('roundPhaseScoring.prepareNextRound.title')}}
    </h4>
    <ul>
      <li v-html="t('roundPhaseScoring.prepareNextRound.performSteps')"></li>
    </ul>
  </template>

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
import Card from '@/services/Card'

export default defineComponent({
  name: 'RoundPhaseScoring',
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
    const navigationState = new NavigationState(route, Phase.IV_SCORING, state)
    const round = navigationState.round
    return { t, state, navigationState, round }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      return `/round/${this.round}/phase/transport/turn/6`
    },
    allGameRoundCards() : readonly Card[] {
      return this.navigationState.cardDeck.roundDiscard
    },
    stableTotalValue() : number {
      return this.allGameRoundCards.reduce((total, card) => total + card.stableScoringValue, 0)
    },
    prestigePlace1() : number {
      return this.round
    },
    prestigePlace2() : number {
      switch (this.round) {
        case 3:
          return 1
        case 4:
          return 2
        default:
          return 0
      }
    }
  },
  methods: {
    next() : void {
      storePhase(this.navigationState)
      if (this.round == 4) {
        this.$router.push(`/finalScoring`)
      }
      else {
        this.$router.push(`/round/${this.round+1}/phase/farm`)
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
.phase-step {
  height: 1.5rem;
  margin-top: -0.4rem
}
</style>
