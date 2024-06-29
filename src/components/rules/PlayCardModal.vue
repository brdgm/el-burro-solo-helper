<template>
  <ModalDialog id="playCardModal" :size-lg="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('rules.playCard.title')">
    <template #body>
      <h5 v-html="t('rules.playCard.normal.title')"></h5>
      <p v-html="t('rules.playCard.normal.intro')"></p>
      <ul>
        <li v-html="t('rules.playCard.normal.marketBarrowSlotEmpty')"></li>
        <li v-html="t('rules.playCard.normal.marketBarrowSlotsFilled')"></li>
        <ul>
          <li>
            <AppIcon type="card-placement" name="same-number" class="cardPlacement"/>
            <span v-html="t('rules.playCard.normal.sameNumber')"></span>
          </li>
          <li>
            <AppIcon type="card-placement" :name="navigationState.roundCard.cardPlacement" class="cardPlacement"/>
            <span v-html="t('rules.playCard.normal.leftOrRight')"></span>
          </li>
        </ul>
        <li v-html="t('rules.playCard.normal.noAcquisitions')"></li>
      </ul>
      <h5 v-html="t('rules.playCard.special.title')"></h5>
      <p v-html="t('rules.playCard.special.intro')"></p>
      <ul>
        <li>
          <AppIcon name="hand-limit" class="handLimit"/>
          <span v-html="t('rules.playCard.special.cardLimit')"></span>
        </li>
        <li v-html="t('rules.playCard.special.paySilver')"></li>
        <ul>
          <li>
            <AppIcon type="special-farm-card-selection" :name="navigationState.roundCard.specialFarmCardSelection" class="cardPlacement"/>
            <span v-html="t('rules.playCard.special.pickCard')"></span>
          </li>
          <li v-html="t('rules.playCard.special.gameEndMarketBarrow')"></li>
          <li v-html="t('rules.playCard.special.additionalCards')"></li>
          <li>
            <AppIcon name="hot" class="hot"/>
            <span v-html="t('rules.playCard.special.hotVariant')"></span>
          </li>
        </ul>
        <li v-html="t('rules.playCard.special.drawNew')"></li>
      </ul>
      <p v-html="t('rules.playCard.special.notPossible')"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import AppIcon from '../structure/AppIcon.vue';
import NavigationState from '@/util/NavigationState';

export default defineComponent({
  name: 'PlayCardModal',
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
  }
})
</script>

<style lang="scss" scoped>
.cardPlacement {
  height: 1.8rem;
  float: left;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
}
.handLimit {
  height: 3rem;
  float: left;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
}
.hot {
  height: 2rem;
  float: left;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
}
li {
  clear: both;
}
</style>
