<template>
  <SideBar :navigationState="navigationState"/>

  <h1>
    <AppIcon type="phase" name="3" class="phase"/>
    {{t('roundPhaseTransport.title')}}<span v-if="turn > 0">: {{t(`player.${navigationState.turnPlayer}`)}}
    </span>
  </h1>

  <TransportDonkeyCards :navigationState="navigationState" v-if="turn == 0"/>
  <TransportSiesta :navigationState="navigationState" v-else-if="turn <= 2" @nextStartPlayer="setNextStartPlayer"/>
  <TransportGoatDelivery :navigationState="navigationState" v-else-if="turn <= 4"/>
  <TransportDonkeyDelivery :navigationState="navigationState" v-else-if="turn <= 6"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next()" :disabled="!nextAllowed">
    {{t('action.next')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>

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
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'
import storePhase from '@/util/storePhase'
import TransportSiesta from '@/components/round/TransportSiesta.vue'
import TransportDonkeyCards from '@/components/round/TransportDonkeyCards.vue'
import TransportGoatDelivery from '@/components/round/TransportGoatDelivery.vue'
import TransportDonkeyDelivery from '@/components/round/TransportDonkeyDelivery.vue'
import { ref } from 'vue'
import Player from '@/services/enum/Player'

export default defineComponent({
  name: 'RoundPhaseTransport',
  components: {
    FooterButtons,
    AppIcon,
    SideBar,
    DebugInfo,
    TransportDonkeyCards,
    TransportSiesta,
    TransportGoatDelivery,
    TransportDonkeyDelivery
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, Phase.III_TRANSPORT, state)
    const round = navigationState.round
    const turn = navigationState.turn
    const nextAllowed = ref(turn != 2)
    return { t, state, navigationState, round, turn, nextAllowed }
  },
  data() {
    return {
      nextStartPlayer: undefined as Player|undefined
    }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      if (this.turn > 0) {
        return `/round/${this.round}/phase/transport/turn/${this.turn-1}`        
      }
      else {
        return `/round/${this.round}/phase/revenue/turn/6`
      }
    }
  },
  methods: {
    next() : void {
      storePhase(this.navigationState, this.nextStartPlayer)
      if (this.turn < 6) {
        this.$router.push(`/round/${this.round}/phase/transport/turn/${this.turn+1}`)
      }
      else {
        this.$router.push(`/round/${this.round}/phase/scoring`)
      }
    },
    setNextStartPlayer(startPlayer : Player) : void {
      this.nextStartPlayer = startPlayer
      this.nextAllowed = true
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
