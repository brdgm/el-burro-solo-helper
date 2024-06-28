<template>
  <h1>
    <AppIcon type="phase" name="2" class="phase"/>
    Revenue Phase
  </h1>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'
import Phase from '@/services/enum/Phase'

export default defineComponent({
  name: 'RoundPhaseRevenue',
  components: {
    FooterButtons,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, Phase.II_REVENUE, state)
    const round = navigationState.round
    return { t, state, navigationState, round }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      return `/round/${this.round}/phase/farm`
    }
  },
  methods: {
    next() : void {
      this.$router.push(`/round/${this.round}/phase/transport`)
    }
  }
})
</script>

<style lang="scss" scoped>
.phase {
  height: 3rem;
  margin-top: -0.5rem
}
</style>
