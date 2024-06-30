<template>
  <ModalDialog id="donkeyDeliveryModal" :size-lg="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('rules.donkeyDelivery.title')">
    <template #body>
      <h5 v-html="t('rules.donkeyDelivery.delivery.title')"></h5>
      <p v-html="t('rules.donkeyDelivery.delivery.startedDelivery')"></p>
      <p>
        <AppIcon type="delivery-target" :name="roundCard.deliveryTarget" class="icon"/>
        <span v-html="t(`rules.donkeyDelivery.delivery.deliveryTarget.${roundCard.deliveryTarget}`)"></span>
      </p>
      <hr/>
      <h5>
        <AppIcon type="delivery-target" name="market-barrow" class="icon"/>
        <span v-html="t('rules.donkeyDelivery.marketBarrow.title')"></span>
      </h5>
      <ol>
        <li v-html="t('rules.donkeyDelivery.marketBarrow.slotOrder')"></li>
        <li v-html="t('rules.donkeyDelivery.marketBarrow.markingOrder')"></li>
        <li v-html="t('rules.donkeyDelivery.marketBarrow.fallback')"></li>
      </ol>
      <h5>
        <AppIcon type="delivery-target" name="local-market" class="icon"/>
        <span v-html="t('rules.donkeyDelivery.localMarket.title')"></span>
      </h5>
      <ol>
        <li v-html="t('rules.donkeyDelivery.localMarket.marketOrder')"></li>
        <li v-html="t('rules.donkeyDelivery.localMarket.markingOrder')"></li>
        <li v-html="t('rules.donkeyDelivery.localMarket.fallback')"></li>
      </ol>
      <p>
        <a data-bs-toggle="modal" href="#deliveryTargetScoringModal" class="rule"><span v-html="t('rules.donkeyDelivery.deliveryTargets')"></span></a>
      </p>
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

export default defineComponent({
  name: 'DonkeyDeliveryModal',
  components: {
    ModalDialog,
    AppIcon
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
}
li {
  clear: both;
  margin-bottom: 0.5rem;
}
</style>
