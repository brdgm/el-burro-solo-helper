<template>
  <ModalDialog id="rewardTracksModal" :size-lg="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('rules.rewardTracks.title')">
    <template #body>
      <h5 v-html="t('rules.rewardTracks.tracks.title')"></h5>
      <p v-html="t('rules.rewardTracks.tracks.intro')"></p>
      <ul>
        <li>
          <span v-html="t('rules.rewardTracks.tracks.space1')"></span><br/>
          <span v-if="isAmbitiousDifficulty" v-html="t('rules.rewardTracks.tracks.gainPrestige', {prestige:1})"></span>
        </li>
        <li>
          <span v-html="t('rules.rewardTracks.tracks.space2')"></span><br/>
          <span v-if="isAmbitiousDifficulty" v-html="t('rules.rewardTracks.tracks.gainPrestige', {prestige:2})"></span>
          <span v-else v-html="t('rules.rewardTracks.tracks.gainPrestige', {prestige:1})"></span>
        </li>
        <li>
          <span v-html="t('rules.rewardTracks.tracks.space3')"></span><br/>
          <span v-if="isAmbitiousDifficulty" v-html="t('rules.rewardTracks.tracks.gainPrestige', {prestige:3})"></span>
          <span v-else v-html="t('rules.rewardTracks.tracks.gainPrestige', {prestige:2})"></span>
        </li>
        <li>
          <AppIcon type="special-farm-card-selection" :name="roundCard.specialFarmCardSelection" class="icon"/>
          <span v-html="t('rules.rewardTracks.tracks.space4')"></span><br/>
          <div class="mt-1">
            <DeliveryGoodSelection :navigationState="navigationState" :allowAdd="false"/>
          </div>
        </li>
      </ul>
      <h5 v-html="t('rules.rewardTracks.extensions.title')"></h5>
      <p v-html="t('rules.rewardTracks.extensions.intro')"></p>
      <p v-html="t('rules.rewardTracks.extensions.activation')"></p>
      <ul>
        <li v-html="t('rules.rewardTracks.extensions.hasWorker')"></li>
        <li>
          <AppIcon type="action" name="hire-worker" class="icon"/>
          <span v-html="t('rules.rewardTracks.extensions.noWorker')"></span>
        </li>
      </ul>
      <p v-html="t('rules.rewardTracks.extensions.extensionsIntro')"></p>
      <div v-for="farmExtension of farmExtensions" :key="farmExtension" class="clearfix mb-2 farmExtension">
        <AppIcon type="farm-extension-thatched-roof" :name="farmExtension" class="icon farmExtension"/>
        <AppIcon type="farm-extension-tiled-roof" :name="farmExtension" class="icon farmExtension"/>
        <div class="fw-bold">
          <a v-if="getFarmExtensionRulesModal(farmExtension)" data-bs-toggle="modal" :href="getFarmExtensionRulesModal(farmExtension)" class="rule">
            <span v-html="t(`rules.rewardTracks.extensions.farmExtension.${farmExtension}.title`)"></span>
          </a>
          <span v-else v-html="t(`rules.rewardTracks.extensions.farmExtension.${farmExtension}.title`)"></span>
        </div>
        <div>
          <i><span v-html="t('rules.rewardTracks.extensions.thatchedRoof')"></span>: </i>
          <span v-html="t(`rules.rewardTracks.extensions.farmExtension.${farmExtension}.thatchedRoof`)"></span>
        </div>
        <div>
          <i><span v-html="t('rules.rewardTracks.extensions.tiledRoof')"></span>: </i>
          <span v-html="t(`rules.rewardTracks.extensions.farmExtension.${farmExtension}.tiledRoof`)"></span>
        </div>
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import AppIcon from '../structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'
import Card from '@/services/Card'
import DeliveryGoodSelection from '../round/DeliveryGoodSelection.vue'
import { useStateStore } from '@/store/state'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import FarmExtension from '@/services/enum/FarmExtension'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

export default defineComponent({
  name: 'RewardTracksModal',
  components: {
    ModalDialog,
    AppIcon,
    DeliveryGoodSelection
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
    roundCard() : Card {
      return this.navigationState.roundCard
    },
    isAmbitiousDifficulty() : boolean {
      return this.state.setup.rewardDifficultyLevel == DifficultyLevel.HARD
    },
    farmExtensions() : FarmExtension[] {
      return getAllEnumValues(FarmExtension)
    }
  },
  methods: {
    getFarmExtensionRulesModal(farmExtension: FarmExtension) : string|undefined {
      switch (farmExtension) {
        case FarmExtension.DONKEY_DELIVERY_WITH_COSTS:
          return '#donkeyDeliveryModal'
        case FarmExtension.TRAVEL_ON_THE_ROAD:
          return '#travelRoadModal'
        case FarmExtension.PLAY_A_FARM_CARD:
          return '#playCardModal'
        case FarmExtension.GOAT_DELIVERY_WITH_COSTS:
          return '#goatDeliveryModal'
        case FarmExtension.COMMUNITY_DELIVERY_FREE_STEP_REWARD_TRACK:
          return '#communityDeliveryModal'
        default:
          return undefined
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1.8rem;
  float: left;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  &.farmExtension {
    height: 6rem;
  }
}
li {
  clear: both;
  margin-bottom: 0.5rem;
}
</style>
