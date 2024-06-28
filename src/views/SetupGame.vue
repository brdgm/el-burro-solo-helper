<template>
  <h1>{{t('setup.title')}}</h1>

  <DifficultyLevel/>
  <RewardDifficultyLevel/>
  <StartPlayer v-model="startPlayer"/>
  <GameRoundTiles v-model="gameRoundTiles"/>
  <FarmExtensionTiles v-model="farmExtensionTiles"/>

  <button class="btn btn-primary btn-lg mt-4" @click="setupBot()">
    {{t('setupBot.title')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import Player from '@/services/enum/Player'
import GameRoundTiles from '@/components/setup/GameRoundTiles.vue'
import FarmExtensionTiles from '@/components/setup/FarmExtensionTiles.vue'
import StartPlayer from '@/components/setup/StartPlayer.vue'
import randomEnum from '@brdgm/brdgm-commons/src/util/random/randomEnum'
import randomGameRoundTiles from '@/util/randomGameRoundTiles'
import randomFarmExtensionTiles from '@/util/randomFarmExtensionTiles'
import randomTransportBonusTiles from '@/util/randomTransportBonusTiles'
import RewardDifficultyLevel from '@/components/setup/RewardDifficultyLevel.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    DifficultyLevel,
    RewardDifficultyLevel,
    GameRoundTiles,
    FarmExtensionTiles,
    StartPlayer
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const startPlayer = ref(randomEnum(Player))
    const gameRoundTiles = ref(randomGameRoundTiles())
    const farmExtensionTiles = ref(randomFarmExtensionTiles())

    return { t, state, startPlayer, gameRoundTiles, farmExtensionTiles }
  },
  methods: {
    setupBot() : void {
      this.state.resetGame()
      this.state.setup.startPlayer = this.startPlayer
      this.state.setup.gameRoundTiles = this.gameRoundTiles?.map(tile => tile.id) ?? []
      this.state.setup.farmExtensionTiles = this.farmExtensionTiles?.map(tile => tile.id) ?? []
      this.state.setup.transportBonusTiles = randomTransportBonusTiles().map(tile => tile.id)
      this.$router.push('/setupBot')
    }
  }
})
</script>
