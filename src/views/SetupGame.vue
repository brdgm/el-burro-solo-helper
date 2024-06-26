<template>
  <h1>{{t('setup.title')}}</h1>

  <DifficultyLevel/>

  <h3>Game Board</h3>

  <h3>Reward Board</h3>

  <h3>Start Player</h3>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    DifficultyLevel
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      this.$router.push('/turn/1')
    }
  }
})
</script>
