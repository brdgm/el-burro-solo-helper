<template>
  <ModalDialog id="travelRoadModal" :size-lg="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('rules.travelRoad.title')">
    <template #body>
      <p v-html="t('rules.travelRoad.intro')"></p>
      <ul>
        <li>
          <AppIcon type="donkey-selection" :name="roundCard.donkeySelection" class="icon"/>
          <span v-html="t(`rules.travelRoad.donkeySelection.${roundCard.donkeySelection}`)"></span>
        </li>
        <li v-html="t('rules.travelRoad.troughsMilestones')"></li>
        <li v-html="t('rules.travelRoad.barriers')"></li>
        <li>
          <AppIcon type="junction-selection" :name="roundCard.junctionSelection" class="icon"/>          
          <span v-html="t(`rules.travelRoad.junctionSelection.${roundCard.junctionSelection}`)"></span>
        </li>
        <li v-html="t('rules.travelRoad.harbor')"></li>
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

export default defineComponent({
  name: 'TravelRoadModal',
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
