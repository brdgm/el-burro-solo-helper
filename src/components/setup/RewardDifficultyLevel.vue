<template>
  <h5 class="mt-4 mb-3">{{t('setup.rewardDifficultyLevel.title')}}</h5>
  <div>
    <div class="form-check-inline" v-for="difficultyLevel of difficultyLevels" :key="difficultyLevel">
      <label class="form-check-label">
        <input class="form-check-input" type="radio" name="setupRewardDifficultyLevel" v-model="state.setup.rewardDifficultyLevel" :value="difficultyLevel">
        <AppIcon type="difficulty-level" :name="difficultyLevel.toString()" class="icon"/>
        {{t(`difficultyLevel.${difficultyLevel}`)}}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import AppIcon from '../structure/AppIcon.vue'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

export default defineComponent({
  name: 'RewardDifficultyLevel',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    difficultyLevels(): DifficultyLevel[] {
      return [DifficultyLevel.EASY,DifficultyLevel.HARD]
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1.5rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
</style>