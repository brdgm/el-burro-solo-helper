<template>
  <h4>
    <AppIcon type="phase-step" name="2" class="phase-step"/>
    {{t('roundPhaseTransport.siesta.title')}}
  </h4>

  <template v-if="isPlayer">
    <ul>
      <li v-html="t('roundPhaseTransport.takeYourTurn')"></li>
    </ul>
  </template>

  <template v-else>
    <ul>
      <li v-html="t('roundPhaseTransport.siesta.moveSiesta', {value:roundCard.siestaValue}, roundCard.siestaValue)"></li>
      <li v-if="roundCard.siestaPlusTile">
        <AppIcon type="plus-tile" :name="roundCard.siestaPlusTile.toString()" class="plusTile"/>
        <span v-html="t('roundPhaseTransport.siesta.plusTile', {value:roundCard.siestaPlusTile}, roundCard.siestaPlusTile)"></span>
      </li>
      <li v-html="t('roundPhaseTransport.siesta.travelGainPrestige')"></li>
      <li v-if="transportBonus">
        <AppIcon type="action" :name="transportBonus" class="icon"/>
        <span v-html="t('roundPhaseTransport.siesta.transportBonus')"></span>
        <div v-if="isCommunityDelivery">
          <CommunityDelivery :navigationState="navigationState"/>
        </div>
        <div v-else-if="isTravelRoad">
          <TravelRoad :navigationState="navigationState"/>
        </div>
        <div v-else-if="isPlayFarmCard">
          <PlayFarmCard :navigationState="navigationState"/>
        </div>
        <div v-else-if="isDonkeyDelivery">
          <DonkeyDelivery :navigationState="navigationState"/>
        </div>
      </li>
    </ul>
  </template>

  <template v-if="turn == 2">
    <h4 v-html="t('roundPhaseTransport.siesta.updateTurnOrder.title')"></h4>
    <p>
      <span class="me-3" v-html="t('roundPhaseTransport.siesta.updateTurnOrder.newStartPlayer')"></span>
      <span class="form-check-inline" v-for="player of playerOptions" :key="player">
        <label class="form-check-label">
          <input class="form-check-input" type="radio" name="setupStartPlayer" v-model="startPlayer" :value="player">
          {{t(`player.${player}`)}}
        </label>
      </span>
    </p>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'
import Player from '@/services/enum/Player'
import Card from '@/services/Card'
import Action from '@/services/enum/Action'
import CommunityDelivery from './CommunityDelivery.vue'
import TravelRoad from './TravelRoad.vue'
import PlayFarmCard from './PlayFarmCard.vue'
import DonkeyDelivery from './DonkeyDelivery.vue'

export default defineComponent({
  name: 'TransportSiesta',
  emits: {
    nextStartPlayer: (_startPlayer: Player) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    AppIcon,
    CommunityDelivery,
    TravelRoad,
    PlayFarmCard,
    DonkeyDelivery
  },
  setup(props) {
    const { t } = useI18n()
    const round = props.navigationState.round
    const turn = props.navigationState.turn
    return { t, round, turn }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      startPlayer: undefined as boolean|undefined
    }
  },
  computed: {
    isPlayer() : boolean {
      return this.navigationState.turnPlayer == Player.PLAYER
    },
    isBot() : boolean {
      return this.navigationState.turnPlayer == Player.BOT
    },
    roundCard() : Card {
      return this.navigationState.roundCard
    },
    transportBonus() : Action|undefined {
      return this.navigationState.transportBonusTile.action[this.roundCard.siestaValue]
    },
    isCommunityDelivery() : boolean {
      return this.transportBonus == Action.COMMUNITY_DELIVERY
    },
    isTravelRoad() : boolean {
      return this.transportBonus == Action.TRAVEL_ROAD_2
    },
    isPlayFarmCard() : boolean {
      return this.transportBonus == Action.PLAY_FARM_CARD
    },
    isDonkeyDelivery() : boolean {
      return this.transportBonus == Action.PAY_SILVER_1_DONKEY_DELIVERY_1
    },
    playerOptions() : Player[] {
      return Object.values(Player)
    }
  },
  watch: {
    startPlayer(newValue) {
      this.$emit('nextStartPlayer', newValue)
    }
  }
})
</script>

<style lang="scss" scoped>
.phase-step {
  height: 1.5rem;
  margin-top: -0.4rem
}
ul > li {
  margin-top: 1rem;
}
.icon {
  height: 3rem;
  margin-right: 0.5rem;
}
.plusTile {
  height: 2rem;
  margin-right: 0.5rem;
  filter: drop-shadow(2px 2px 2px #888);
}
</style>
