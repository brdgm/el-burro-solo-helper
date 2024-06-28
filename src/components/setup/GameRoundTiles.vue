<template>
  <h3 class="mt-4 mb-3">{{t('setup.gameRoundTiles.title')}}</h3>
  <p v-html="t('setup.gameRoundTiles.setupGameBoard')"></p>
  <div>
    <AppIcon v-for="tile of gameRoundTiles" :key="tile.id" type="game-round-tile" :name="tile.id" class="icon"/>
  </div>
  <div>
    <button class="btn btn-outline-secondary btn-sm mt-2" @click="randomize()">{{t('setup.randomize')}}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import GameRoundTile from '@/services/GameRoundTile'
import randomGameRoundTiles from '@/util/randomGameRoundTiles'

export default defineComponent({
  name: 'GameRoundTiles',
  components: {
    AppIcon
  },
  emits: ['update:modelValue'],
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    modelValue: {
      type: Array as PropType<GameRoundTile[]>,
      required: true
    }
  },
  data() {
    return {
      gameRoundTiles: this.modelValue
    }
  },
  methods: {
    randomize() {
      this.gameRoundTiles = randomGameRoundTiles()
    }
  },
  watch: {
    gameRoundTiles(newValue) {
      this.$emit('update:modelValue', newValue)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 6rem;
  margin-right: 1rem;
  filter: drop-shadow(2px 2px 3px #888);
}
</style>