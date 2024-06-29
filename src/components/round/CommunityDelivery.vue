<template>
  <a data-bs-toggle="modal" href="#communityDeliveryModal" class="rule"><span v-html="t('communityDelivery.title')"></span></a>
  <div class="mt-1">
    <DeliveryGoodSelection :navigationState="navigationState"/>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import DeliveryGoodSelection from './DeliveryGoodSelection.vue'

export default defineComponent({
  name: 'CommunityDelivery',
  components: {
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
  }
})
</script>
