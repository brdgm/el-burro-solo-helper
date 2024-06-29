<template>
  <ModalDialog id="communityDeliveryModal" :size-lg="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('rules.communityDelivery.title')">
    <template #body>
      <h5 v-html="t('rules.communityDelivery.deliveryGoods.title')"></h5>
      <p v-html="t('rules.communityDelivery.deliveryGoods.preferredGoods')"></p>
      <p>
        <DeliveryGoodSelection :navigationState="navigationState"/>
      </p>
      <p v-html="t('rules.communityDelivery.deliveryGoods.trackTopSpace')"></p>
      <h5 v-html="t('rules.communityDelivery.title')"></h5>
      <p v-html="t('rules.communityDelivery.firstFarmGood')"></p>
      <p><a data-bs-toggle="modal" href="#rewardTracksModal" class="rule"><span v-html="t('rules.communityDelivery.rewardTracks')"></span></a></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import NavigationState from '@/util/NavigationState'
import Card from '@/services/Card'
import DeliveryGoodSelection from '../round/DeliveryGoodSelection.vue'

export default defineComponent({
  name: 'CommunityDeliveryModal',
  components: {
    ModalDialog,
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
}
li {
  clear: both;
  margin-bottom: 0.5rem;
}
</style>
