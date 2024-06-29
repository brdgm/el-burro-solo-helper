<template>
  <a data-bs-toggle="modal" href="#donkeyDeliveryModal" class="rule"><span v-html="t('donkeyDelivery.title')"></span></a>
  <div class="mt-1">
    <a data-bs-toggle="modal" href="#donkeyDeliveryModal">
      <AppIcon type="delivery-target" :name="roundCard.deliveryTarget" class="icon"/>
    </a>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'DonkeyDelivery',
  components: {
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
    roundCard() {
      return this.navigationState.roundCard
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1.8rem;
  margin-right: 0.5rem;
}
</style>
