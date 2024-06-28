<template>
  <h3 class="mt-4 mb-3">{{t('setup.farmExtensionTiles.title')}}</h3>
  <p v-html="t('setup.farmExtensionTiles.placeTiles')"></p>
  <div>
    <AppIcon v-for="tile of farmExtensionTiles" :key="tile.id" type="farm-extension-thatched-roof" :name="tile.id" class="icon"/>
  </div>
  <div>
    <button class="btn btn-outline-secondary btn-sm mt-2" @click="randomize()">{{t('setup.randomize')}}</button>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import FarmExtensionTile from '@/services/FarmExtensionTile'
import randomFarmExtensionTiles from '@/util/randomFarmExtensionTiles'

export default defineComponent({
  name: 'FarmExtensionTiles',
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
      type: Array as PropType<FarmExtensionTile[]>,
      required: true
    }
  },
  data() {
    return {
      farmExtensionTiles: this.modelValue
    }
  },
  methods: {
    randomize() {
      this.farmExtensionTiles = randomFarmExtensionTiles()
    }
  },
  watch: {
    farmExtensionTiles(newValue) {
      this.$emit('update:modelValue', newValue)
      console.log(newValue)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 7.5rem;
}
</style>