<script setup lang="ts">
import { usePromotionStore } from '@/stores/promotion'
import { onMounted, ref } from 'vue'
import { inject, type Ref } from 'vue'
import type { Promotion } from '@/types/Promotion'
import { useReceiptStore } from '@/stores/receipt'
const dialog = inject<Ref<boolean>>('promotionDialog')
const promotionStore = usePromotionStore()
const receiptStore = useReceiptStore()
const selectedPromotion = ref()
const useButtons = ref(false)

onMounted(async () => {
  promotionStore.getPromotions()
})

function cancel() {
  if (dialog) dialog.value = false
}

async function usePromotion(item: Promotion) {
  receiptStore.promotion = true
  useButtons.value = !useButtons.value
  selectedPromotion.value = item
  await promotionStore.getPromotion(item)

  const beforeTotal = await receiptStore.receipt.before_total

  receiptStore.receipt.discount = Math.floor(
    beforeTotal * promotionStore.editedPromotion.discount_late
  )

  if (
    beforeTotal * promotionStore.editedPromotion.discount_late >=
    promotionStore.editedPromotion.maxinum
  ) {
    receiptStore.receipt.discount = await promotionStore.editedPromotion.maxinum
  }
  receiptStore.receipt.after_total =
    receiptStore.receipt.before_total - receiptStore.receipt.discount
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="450px"
    ><v-card height="500">
      <!-- <v-table height="300px">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Discount</th>
            <th class="text-left">Discount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in promotionStore.promotions" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.discount_late * 100 }} %</td>
            <td>
              <v-btn
                :color="item === selectedPromotion ? 'red' : 'green'"
                @click="usePromotion(item)"
                :key="item.id"
                >use</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table> -->
      <v-card-title style="background-color: #415a77; color: white">
        <span class="style"> promotion </span>
      </v-card-title>

      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          max-height: 400px;
          overflow-y: auto;
        "
      >
        <v-sheet
          height="70"
          width="390"
          v-for="item in promotionStore.promotions"
          :key="item.id"
          color="blue-grey-lighten-4"
          style="margin: 5px 0px"
        >
          <div>{{ item.name }} {{}}</div>
          <v-btn
            :color="item === selectedPromotion ? 'teal-lighten-3' : 'white'"
            @click="usePromotion(item)"
            :key="item.id"
            :disabled="receiptStore.receipt.before_total < item.mininum ? true : false"
            >use</v-btn
          ></v-sheet
        >
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn style="background-color: #fe6d73" color="white" @click="cancel">cancel</v-btn>
        <v-btn style="background-color: #588157" color="white">confirm</v-btn>
      </v-card-actions>
    </v-card></v-dialog
  >
</template>
