<template>
  <h1>{{t('setupBot.title')}}</h1>

  <div class="instructions">
    <ol>
      <li v-html="t('setupBot.soloFarmBoard')"></li>
      <li v-html="t('setupBot.goodsTokenSilver')"></li>
      <li v-html="t('setupBot.farmCards')"></li>
      <ul>
        <li v-html="t('setupBot.farmCard1')"></li>
        <li v-html="t('setupBot.farmCard23')"></li>
        <li v-html="t('setupBot.farmCard4')"></li>
      </ul>
      <li v-html="t('setupBot.supportMarker')"></li>
      <li v-html="t('setupBot.stableBoard')"></li>
      <li v-html="t('setupBot.soloFarmGoods')"></li>
      <li v-html="t('setupBot.specialSoloFarmCards')"></li>
      <li>
        <span v-html="t('setupBot.startingSpace')"></span><br/>
        <button class="btn btn-secondary mt-2">{{t('setupBot.determineStartingSpace')}}</button>
      </li>
    </ol>

    <p v-html="t('setupBot.unusedMaterial.title')"></p>
    <ul>
      <li v-html="t('setupBot.unusedMaterial.soloGameRoundCards')"></li>
      <li v-html="t('setupBot.unusedMaterial.soloTransportBonusTiles')"></li>
      <li v-html="t('setupBot.unusedMaterial.soloRewardOverview')"></li>
    </ul>
  </div>

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

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    return { t, state }
  },
  methods: {
    startGame() : void {
      this.$router.push('/turn/1')
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
}
</style>