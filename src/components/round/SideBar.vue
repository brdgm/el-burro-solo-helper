<template>
  <div class="sidebar">
    <p>
      {{t('sideBar.round')}} <strong>{{round}}</strong> / 4<br/>
      <span v-if="turn > 0">{{t('sideBar.turn')}} {{turn}}</span>
    </p>
    <ul class="rules">
      <li><a data-bs-toggle="modal" href="#roundCardModal" class="rule">{{t('gameRoundCard.title')}}</a></li>
      <li><a data-bs-toggle="modal" href="#deliveryTargetScoringModal" class="rule">{{t('rules.deliveryTargetScoring.title')}}</a></li>
    </ul>
    <GameRoundTile :navigationState="navigationState"/>
  </div>

  <GameRoundCardModal :navigationState="navigationState"/>
  <PlayCardModal :navigationState="navigationState"/>
  <TravelRoadModal :navigationState="navigationState"/>
  <DonkeyDeliveryModal :navigationState="navigationState"/>
  <GoatDeliveryModal :navigationState="navigationState"/>
  <CommunityDeliveryModal :navigationState="navigationState"/>
  <DeliveryTargetScoringModal :navigationState="navigationState"/>
  <RewardTracksModal :navigationState="navigationState"/>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import GameRoundTile from './GameRoundTile.vue'
import GameRoundCardModal from './GameRoundCardModal.vue'
import PlayCardModal from '../rules/PlayCardModal.vue'
import TravelRoadModal from '../rules/TravelRoadModal.vue'
import DonkeyDeliveryModal from '../rules/DonkeyDeliveryModal.vue'
import GoatDeliveryModal from '../rules/GoatDeliveryModal.vue'
import CommunityDeliveryModal from '../rules/CommunityDeliveryModal.vue'
import DeliveryTargetScoringModal from '../rules/DeliveryTargetScoringModal.vue'
import RewardTracksModal from '../rules/RewardTracksModal.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    GameRoundTile,
    GameRoundCardModal,
    PlayCardModal,
    TravelRoadModal,
    DonkeyDeliveryModal,
    GoatDeliveryModal,
    CommunityDeliveryModal,
    DeliveryTargetScoringModal,
    RewardTracksModal
  },
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
  },
  computed: {
    round() : number {
      return this.navigationState.round
    },
    turn() : number {
      return this.navigationState.turn
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 150px;
  margin-left: 10px;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    width: 100px;
  }
}
.rules {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  li {
    margin-bottom: 8px;
    a {
      font-size: 0.9rem;
      @media (max-width: 600px) {
        font-size: 0.8rem;
      }
    }
  }
}
</style>
