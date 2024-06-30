<template>
  <a data-bs-toggle="modal" href="#travelRoadModal" class="rule"><span v-html="t('travelRoad.title')"></span></a>
  <div class="mt-1">
    <a data-bs-toggle="modal" href="#travelRoadModal">
      <AppIcon type="donkey-selection" :name="roundCard.donkeySelection" class="icon"/>
      <AppIcon type="junction-selection" :name="roundCard.junctionSelection" class="icon"/>
    </a>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import Card from '@/services/Card'

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
  margin-right: 0.5rem;
}
</style>
