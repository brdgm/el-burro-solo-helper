<template>
  <div v-if="gameRoundTile">
    <AppIcon type="game-round-tile" :name="gameRoundTile.id" class="icon mb-3 mt-2"/>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import GameRoundTile from '@/services/GameRoundTile'

export default defineComponent({
  name: 'GameRoundTile',
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
    gameRoundTile() : GameRoundTile|undefined {
      return this.navigationState.gameRoundTile
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 8rem;
  filter: drop-shadow(2px 2px 3px #888);
  @media (max-width: 600px) {
    height: 6rem;
  }
}
</style>
