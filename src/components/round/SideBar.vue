<template>
  <div class="sidebar">
    <p>{{t('sideBar.round')}} <strong>{{round}}</strong> / 4</p>
    <GameRoundTile :navigationState="navigationState"/>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import GameRoundTile from './GameRoundTile.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    GameRoundTile
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    round() : number {
      return this.navigationState.round
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 150px;
  margin-left: 10px;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    width: 100px;
  }
}
</style>
