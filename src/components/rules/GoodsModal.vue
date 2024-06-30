<template>
  <ModalDialog id="goodsModal" :size-lg="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('rules.goods.title')">
    <template #body>
      <p v-html="t('rules.goods.usage')"></p>
      <p v-html="t('rules.goods.field')"></p>
      <p v-html="t('rules.goods.deliver')"></p>
      <p v-html="t('rules.goods.deliverSilverWorker')"></p>
      <h5 v-html="t('rules.goods.trade.title')"></h5>
      <p v-html="t('rules.goods.trade.intro')"></p>
      <table class="table">
        <thead class="table-light">
          <tr>
            <th>{{t('rules.goods.trade.needs')}}</th>
            <th>{{t('rules.goods.trade.tradesFor')}}</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr>
            <td>{{t('rules.goods.trade.silver')}}</td>
            <td>{{t('rules.goods.trade.silverTrade')}}</td>
          </tr>
          <tr>
            <td rowspan="2">{{t('rules.goods.trade.goodsToken')}}</td>
            <td>{{t('rules.goods.trade.goodsTokenTradeSilver')}}</td>
          </tr>
          <tr>
            <td>{{t('rules.goods.trade.goodsTokenTradeWorker')}}</td>
          </tr>
          <tr>
            <td>{{t('rules.goods.trade.worker')}}</td>
            <td>{{t('rules.goods.trade.workerTradeSilver')}}</td>
          </tr>
        </tbody>
      </table>
      <ul>
        <li v-html="t('rules.goods.trade.missingGoods')"></li>
        <li v-html="t('rules.goods.trade.tradeOnce')"></li>
      </ul>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'GoodsModal',
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1.8rem;
  float: left;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
}
li {
  clear: both;
  margin-bottom: 0.5rem;
}
</style>
