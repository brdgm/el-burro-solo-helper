<template>
  <span>Leon travels on the road.</span>
  <div class="mt-1">
    <AppIcon type="junction-selection" :name="navigationState.roundCard.junctionSelection" class="junction"/>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'TravelRoad',
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
  }
})
</script>

<style lang="scss" scoped>
.junction {
  height: 1.8rem;
}
</style>
