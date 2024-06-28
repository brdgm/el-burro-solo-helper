<template>
  <h3 class="mt-4 mb-3">{{t('setup.startPlayer.title')}}</h3>

  <div>
    <div class="form-check-inline" v-for="player of playerOptions" :key="player">
      <label class="form-check-label">
        <input class="form-check-input" type="radio" name="setupStartPlayer" v-model="startPlayer" :value="player">
        {{t(`player.${player}`)}}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Player from '@/services/enum/Player'

export default defineComponent({
  name: 'StartPlayer',
  emits: ['update:modelValue'],
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    modelValue: {
      type: String as PropType<Player>,
      required: true
    }
  },
  data() {
    return {
      startPlayer: this.modelValue
    }
  },
  computed: {
    playerOptions() : Player[] {
      return Object.values(Player)
    }
  },
  watch: {
    startPlayer(newValue) {
      this.$emit('update:modelValue', newValue)
    }
  }
})
</script>
