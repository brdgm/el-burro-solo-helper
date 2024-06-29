<template>
  <AppIcon v-for="good of goodTokens.used" :key="good" type="good" :name="good.toString()" class="icon removable" @click="removeGoodConfirm(good)"/>
  <button v-if="goodTokens.used.length == 0" class="btn btn-secondary btn-sm" @click="determineGood">{{t('deliveryGoodSelection.firstGood')}}</button>
  <button v-else-if="goodTokens.reserve.length > 0" class="btn btn-secondary btn-sm" @click="determineGood">{{t('deliveryGoodSelection.nextGood')}}</button>

  <ModalDialog id="removeDeliveryGoodModal" :title="t('deliveryGoodSelection.remove.title')">
    <template #body>
      <p v-html="t('deliveryGoodSelection.remove.confirmation')"></p>
      <p><AppIcon v-if="goodToRemove" type="good" :name="goodToRemove.toString()" class="icon"/></p>
      <p v-html="t('deliveryGoodSelection.remove.ignored')"></p>
    </template>
    <template #footer>
      <button class="btn btn-success" data-bs-dismiss="modal" @click="removeGood">{{t('action.ok')}}</button>
      <button class="btn btn-danger" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import Card from '@/services/Card';
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import GoodTokens from '@/services/GoodTokens'
import determineDeliveryGood from '@/util/determineDeliveryGood'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import Good from '@/services/enum/Good'
import showModal from '@brdgm/brdgm-commons/src/util/modal/showModal'

export default defineComponent({
  name: 'DeliveryGoodSelection',
  components: {
    AppIcon,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
  },
  data() {
    return {
      goodToRemove: undefined as Good|undefined
    }
  },
  computed: {
    roundCard() : Card {
      return this.navigationState.roundCard
    },
    goodTokens() : GoodTokens {
      return this.navigationState.goodTokens
    },
  },
  methods: {
    determineGood() {
      determineDeliveryGood(this.goodTokens, this.navigationState.cardDeck)
      this.$forceUpdate()
    },
    removeGoodConfirm(good: Good) {
      this.goodToRemove = good
      showModal('removeDeliveryGoodModal')
    },
    removeGood() {
      if (this.goodToRemove) {
        this.goodTokens.remove(this.goodToRemove)
        this.goodToRemove = undefined
      }
      this.$forceUpdate()
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1.8rem;
  margin-right: 0.5rem;
  &.removable {
    cursor: pointer;
  }
}
</style>
