<template>
  <div v-if="navigationState.round >= 3">
    <a data-bs-toggle="modal" href="#playCardModal" class="rule"><span v-html="t('playFarmCard.special')"></span></a>
    <div class="mt-1">
      <AppIcon type="special-farm-card-selection" :name="navigationState.roundCard.specialFarmCardSelection" class="cardPlacement"/>
      <span class="otherwise" v-html="t('playFarmCard.otherwiseNormal')"></span>
      <AppIcon type="card-placement" name="same-number" class="cardPlacement"/>
      <AppIcon type="card-placement" :name="navigationState.roundCard.cardPlacement" class="cardPlacement"/>
    </div>
  </div>
  <div v-else>
    <a data-bs-toggle="modal" href="#playCardModal" class="rule"><span v-html="t('playFarmCard.normal')"></span></a>
    <div class="mt-1">
      <AppIcon type="card-placement" name="same-number" class="cardPlacement"/>
      <AppIcon type="card-placement" :name="navigationState.roundCard.cardPlacement" class="cardPlacement"/>
    </div>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'PlayFarmCard',
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
.cardPlacement {
  height: 1.8rem;
  margin-right: 0.5rem;
}
.otherwise {
  margin-right: 0.5rem;
}
</style>
