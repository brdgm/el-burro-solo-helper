<template>
  <div class="sidebar">
    <p>{{t('sideBar.round')}} <strong>{{round}}</strong> / 4</p>
    <ul class="rules">
      <li><a data-bs-toggle="modal" href="#playCardModal" class="rule">{{t('rules.playCard.title')}}</a></li>
    </ul>
    <GameRoundTile :navigationState="navigationState"/>
  </div>

  <PlayCardModal :navigationState="navigationState"/>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import GameRoundTile from './GameRoundTile.vue'
import PlayCardModal from '../rules/PlayCardModal.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    GameRoundTile,
    PlayCardModal
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
.rules {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  li {
    margin-bottom: 8px;
    a {
      font-size: 0.9rem;
      @media (max-width: 600px) {
        font-size: 0.8rem;
      }
    }
  }
}
</style>
