<template>
  <ModalDialog id="roundCardModal" :size-lg="true" :scrollable="true"
      :title="t('gameRoundCard.title')">
    <template #body>
      <AppIcon type="difficulty-level" :name="roundCard.difficultyLevel.toString()" class="difficultyLevel"/>
      <table>
        <tr>
          <td v-html="t('gameRoundCard.farmCard')"></td>
          <td>
            <AppIcon type="special-farm-card-selection" :name="roundCard.specialFarmCardSelection" class="icon"/> /
            <AppIcon type="card-placement" name="same-number" class="icon"/>
            <AppIcon type="card-placement" :name="roundCard.cardPlacement" class="icon"/>
          </td>
        </tr>
        <tr>
          <td v-html="t('gameRoundCard.dice')"></td>
          <td>
            <AppIcon type="dice-value" :name="roundCard.diceValue.toString()" class="icon"/>
            <AppIcon type="dice-modification" :name="roundCard.diceModification" class="icon"/>
          </td>
        </tr>
        <tr>
          <td v-html="t('gameRoundCard.delivery')"></td>
          <td>
            <AppIcon type="action" :name="roundCard.deliveryAction" class="icon"/>
            <AppIcon type="delivery-target" :name="roundCard.deliveryTarget" class="icon"/>
          </td>
        </tr>
        <tr>
          <td v-html="t('gameRoundCard.road')"></td>
          <td>
            <AppIcon type="donkey-selection" :name="roundCard.donkeySelection" class="icon"/>
            <AppIcon type="junction-selection" :name="roundCard.junctionSelection" class="icon"/>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <h5 v-html="t('gameRoundCard.transport')"></h5>
          </td>
        </tr>
        <tr>
          <td v-html="t('gameRoundCard.siesta')"></td>
          <td>
            <b>{{roundCard.siestaValue}}</b>
            <AppIcon v-if="roundCard.siestaPlusTile" type="plus-tile" :name="roundCard.siestaPlusTile.toString()" class="plusTile"/>
          </td>
        </tr>
        <tr>
          <td v-html="t('gameRoundCard.goatDelivery')"></td>
          <td>
            <b>{{roundCard.additionalGoatDelivery ? t('gameRoundCard.yes') : t('gameRoundCard.no')}}</b>
          </td>
        </tr>
        <tr>
          <td v-html="t('gameRoundCard.donkey')"></td>
          <td>
            <b>{{roundCard.donkeyValue}}</b>
            <AppIcon v-if="roundCard.donkeyPlusTile" type="plus-tile" :name="roundCard.donkeyPlusTile.toString()" class="plusTile"/>
          </td>
        </tr>
        <tr>
          <td v-html="t('gameRoundCard.stable')"></td>
          <td>
            <b>{{roundCard.stableScoringValue}}</b>
          </td>
        </tr>
      </table>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import AppIcon from '../structure/AppIcon.vue';
import NavigationState from '@/util/NavigationState';
import Card from '@/services/Card';

export default defineComponent({
  name: 'GameRoundCardModal',
  components: {
    ModalDialog,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    roundCard() : Card {
      return this.navigationState.roundCard
    }
  }
})
</script>

<style lang="scss" scoped>
td {
  padding: 0.5rem;
}
.icon {
  height: 2.5rem;
  margin-right: 0.25rem;
}
.plusTile {
  height: 1.75rem;
  margin-left: 0.5rem;
  filter: drop-shadow(2px 2px 2px #888);
}
.difficultyLevel {
  height: 2rem;
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
}
</style>
