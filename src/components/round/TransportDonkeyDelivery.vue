<template>
  <h4>
    <AppIcon type="phase-step" name="4" class="phase-step"/>
    {{t('roundPhaseTransport.donkeyDelivery.title')}}
  </h4>

  <template v-if="isPlayer">
    <ul>
      <li v-html="t('roundPhaseTransport.takeYourTurn')"></li>
    </ul>
  </template>

  <template v-else>
    <ul>
      <li>
        <AppIcon type="action" name="donkey-delivery" class="icon"/>
        <span v-html="t('roundPhaseTransport.donkeyDelivery.deliver', {value:roundCard.donkeyValue}, roundCard.donkeyValue)"></span>
        <div>
          <DonkeyDelivery :navigationState="navigationState"/>          
        </div>        
      </li>
      <li v-if="roundCard.donkeyPlusTile">
        <AppIcon type="plus-tile" :name="roundCard.donkeyPlusTile.toString()" class="plusTile"/>
        <span v-html="t('roundPhaseTransport.donkeyDelivery.plusTile', {value:roundCard.donkeyPlusTile}, roundCard.donkeyPlusTile)"></span>
      </li>
      <li v-if="transportBonus">
        <AppIcon type="action" :name="transportBonus" class="icon"/>
        <span v-html="t('roundPhaseTransport.donkeyDelivery.transportBonus')"></span>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'
import Player from '@/services/enum/Player'
import Card from '@/services/Card'
import Action from '@/services/enum/Action'
import DonkeyDelivery from './DonkeyDelivery.vue'
import CommunityDelivery from './CommunityDelivery.vue'
import TravelRoad from './TravelRoad.vue'
import PlayFarmCard from './PlayFarmCard.vue'

export default defineComponent({
  name: 'TransportDonkeyDelivery',
  components: {
    AppIcon,
    DonkeyDelivery,
    CommunityDelivery,
    TravelRoad,
    PlayFarmCard
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
      return this.navigationState.transportBonusTile.action[this.roundCard.donkeyValue]
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
