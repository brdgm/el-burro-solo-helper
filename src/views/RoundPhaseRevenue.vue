<template>
  <SideBar :navigationState="navigationState"/>

  <h1>
    <AppIcon type="phase" name="2" class="phase"/>
    {{t('roundPhaseRevenue.title')}}: {{t(`player.${navigationState.turnPlayer}`)}}
  </h1>

  <ul>
    <li v-if="turn == 1" v-html="t('roundPhaseRevenue.rollDice')"></li>
    
    <template v-if="isPlayer">
      <li v-if="isRevenueDie" v-html="t('roundPhaseRevenue.player.revenueDie')"></li>
      <li v-else v-html="t('roundPhaseRevenue.player.communityDie')"></li>
    </template>

    <template v-else>
      <template v-if="isRevenueDie">
        <li>
          <span v-html="t('roundPhaseRevenue.bot.revenueDie')"></span><br/>
          <AppIcon type="dice-value" :name="roundCard.diceValue.toString()" class="dice"/>
          <AppIcon type="dice-modification" :name="roundCard.diceModification" class="dice"/>
        </li>
        <li v-html="t('roundPhaseRevenue.bot.bonusAction')"></li>
      </template>
      <template v-else>
        <li v-html="t('roundPhaseRevenue.bot.communityDie')"></li>
        <li v-if="isGameRoundTileCommunityDieBonus" v-html="t('roundPhaseRevenue.bot.gameRoundTileCommunityDieBonus')"></li>
      </template>
    </template>
  </ul>

  <div class="actionDetails" v-if="isBot">
    <h5 v-html="t('roundPhaseRevenue.actionDetails.title')"></h5>
    <p v-html="t('roundPhaseRevenue.actionDetails.intro')"></p>
    <table>
      <tbody>
        <tr>
          <td><AppIcon type="dice-value" name="2" class="dice"/></td>
          <td><AppIcon type="action" name="play-farm-card" class="action"/></td>
          <td><PlayFarmCard :navigationState="navigationState"/></td>
        </tr>
        <tr>
          <td><AppIcon type="dice-value" name="5" class="dice"/></td>
          <td><AppIcon type="action" name="travel-road-2" class="action travel"/></td>
          <td><TravelRoad :navigationState="navigationState"/></td>
        </tr>
        <tr>
          <td><AppIcon type="dice-value" name="6" class="dice"/></td>
          <td><AppIcon type="action" :name="roundCard.deliveryAction" class="action"/></td>
          <td v-if="isDonkeyDelivery"><DonkeyDelivery :navigationState="navigationState"/></td>
          <td v-else><GoatDelivery :navigationState="navigationState"/></td>
        </tr>
        <tr v-if="isRevenueDie">
          <td></td>
          <td><AppIcon type="action" name="community-delivery" class="action"/></td>
          <td><CommunityDelivery :navigationState="navigationState"/></td>
        </tr>
      </tbody>
    </table>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
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
import Player from '@/services/enum/Player'
import Card from '@/services/Card'
import PlayFarmCard from '@/components/round/PlayFarmCard.vue'
import TravelRoad from '@/components/round/TravelRoad.vue'
import Action from '@/services/enum/Action'
import DonkeyDelivery from '@/components/round/DonkeyDelivery.vue'
import GoatDelivery from '@/components/round/GoatDelivery.vue'
import CommunityDelivery from '@/components/round/CommunityDelivery.vue'

export default defineComponent({
  name: 'RoundPhaseRevenue',
  components: {
    FooterButtons,
    AppIcon,
    SideBar,
    DebugInfo,
    PlayFarmCard,
    TravelRoad,
    DonkeyDelivery,
    GoatDelivery,
    CommunityDelivery
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, Phase.II_REVENUE, state)
    const round = navigationState.round
    const turn = navigationState.turn
    return { t, state, navigationState, round, turn }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      if (this.turn > 1) {
        return `/round/${this.round}/phase/revenue/turn/${this.turn-1}`
      }
      else {
        return `/round/${this.round}/phase/farm`
      }
    },
    isPlayer() : boolean {
      return this.navigationState.turnPlayer == Player.PLAYER
    },
    isBot() : boolean {
      return this.navigationState.turnPlayer == Player.BOT
    },
    roundCard() : Card {
      return this.navigationState.roundCard
    },
    isDonkeyDelivery() : boolean {
      return this.roundCard.deliveryAction == Action.DONKEY_DELIVERY
    },
    isRevenueDie() : boolean {
      return this.turn < 5
    },
    isGameRoundTileCommunityDieBonus() : boolean {
      return this.navigationState.gameRoundTile?.id == '1-community-die-bonus'
    }
  },
  methods: {
    next() : void {
      storePhase(this.navigationState)
      if (this.turn < 6) {
        this.$router.push(`/round/${this.round}/phase/revenue/turn/${this.turn+1}`)
      }
      else {
        this.$router.push(`/round/${this.round}/phase/transport/turn/0`)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.phase {
  height: 3rem;
  margin-top: -0.5rem
}
ul > li {
  margin-top: 1rem;
}
.dice {
  height: 3rem;
  margin-right: 0.25rem;
}
.actionDetails {
  tr {
    border-top: 1px solid #ccc;
  }
  td {
    padding: 0.25rem;
  }
  .dice {
    height: 2rem;
  }
  .action {
    height: 2.5rem;
    margin-right: 0.25rem;
    &.travel {
      height: 1.5rem;
    }
  }
}
</style>
