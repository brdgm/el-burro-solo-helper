<template>
  <ModalDialog id="deliveryTargetScoringModal" :size-lg="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('rules.deliveryTargetScoring.title')">
    <template #body>
      <p v-html="t('rules.deliveryTargetScoring.intro')"></p>
      <h5>
        <AppIcon type="delivery-target" name="market-barrow" class="icon"/>
        <span v-html="t('rules.deliveryTargetScoring.marketBarrow.title')"></span>
      </h5>
      <ul>
        <li v-html="t('rules.deliveryTargetScoring.marketBarrow.prestige')"></li>
        <li v-html="t('rules.deliveryTargetScoring.marketBarrow.moveDonkey')"></li>
        <li v-html="t('rules.deliveryTargetScoring.marketBarrow.takeBonuses')"></li>
        <li v-html="t('rules.deliveryTargetScoring.marketBarrow.removeCard')"></li>
      </ul>
      <p>
        <AppIcon type="difficulty-level" name="3" class="icon"/>
        <span v-html="t('rules.deliveryTargetScoring.marketBarrow.ambitiousDifficulty')"></span>
      </p>
      <h5>
        <AppIcon type="delivery-target" name="local-market" class="icon"/>
        <span v-html="t('rules.deliveryTargetScoring.localMarket.title')"></span>
      </h5>
      <ul>
        <li v-html="t('rules.deliveryTargetScoring.localMarket.goodToken')"></li>
        <li v-html="t('rules.deliveryTargetScoring.localMarket.immediateEffect')"></li>
        <li v-html="t('rules.deliveryTargetScoring.localMarket.noToken')"></li>
      </ul>
      <hr/>
      <h5 v-html="t('rules.deliveryTargetScoring.marketBonusTiles.title')"></h5>
      <p v-html="t('rules.deliveryTargetScoring.marketBonusTiles.intro')"></p>
      <p v-html="t('rules.deliveryTargetScoring.marketBonusTiles.adjustments')"></p>
      <ul>
        <li>
          <AppIcon type="market-bonus-tile" name="take-upgraded-good" class="icon marketBonus"/>
          <span v-html="t('rules.deliveryTargetScoring.marketBonusTiles.takeUpgradedGood')"></span>
        </li>
        <li>
          <AppIcon type="market-bonus-tile" name="take-farm-good-pig" class="icon marketBonus"/>
          <span v-html="t('rules.deliveryTargetScoring.marketBonusTiles.takeFarmGoodPig')"></span>
          <div class="mt-2">
            <AppIcon type="difficulty-level" name="3" class="icon"/>
            <span v-html="t('rules.deliveryTargetScoring.marketBonusTiles.takeFarmGoodPigAmbitious')"></span>
          </div>
        </li>
        <li>
          <AppIcon type="market-bonus-tile" name="reward-track-step" class="icon marketBonus"/>
          <span v-html="t('rules.deliveryTargetScoring.marketBonusTiles.rewardTrackStep')"></span>
          <div class="mt-2">
            <DeliveryGoodSelection :navigationState="navigationState"/>
          </div>
        </li>
      </ul>
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

export default defineComponent({
  name: 'DeliveryTargetScoringModal',
  components: {
    ModalDialog,
    AppIcon,
    DeliveryGoodSelection
  },
  setup() {
    const { t } = useI18n()
    return { t }
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
  &.marketBonus {
    height: 3rem;
  }
}
li {
  clear: both;
  margin-bottom: 0.5rem;
}
</style>
