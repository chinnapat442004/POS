<script setup lang="ts">
import { useProductStore } from '@/stores/product'

import { useReceiptItemStore } from '@/stores/receiptItem'

import { useTypeStore } from '@/stores/types'
import type { Product } from '@/types/Product'
import { inject, ref, watch, type Ref } from 'vue'

const dialog = inject<Ref<boolean>>('productDialog')
const productStore = useProductStore()

const receiptItemStore = useReceiptItemStore()

const typeStore = useTypeStore()
const quantity = ref(1)
const total = ref()
const selectedSize = ref()
const selectedType = ref()
const selectedSweet = ref()
const sweet = [
  { id: 1, name: '0%' },
  { id: 2, name: '25%' },
  { id: 3, name: '50%' },
  { id: 4, name: '75%' },
  { id: 5, name: '100%' }
]

watch(
  () => productStore.editedProduct.price,
  async (newPrice) => {
    total.value = await newPrice
  }
)

watch(
  () => productStore.editedProduct.sizes,
  (sizes) => {
    if (sizes && sizes.length > 0) {
      selectedSize.value = sizes[0]
    }
  }
)
watch(
  () => productStore.editedProduct.types,
  (types) => {
    if (types && types.length > 0) {
      selectedType.value = types[0]
    }
  }
)

function selectReceiptItem(p: Product) {
  productStore.editedProduct = JSON.parse(JSON.stringify(p))
  receiptItemStore.addProduct(p)
  receiptItemStore.addReceiptItem(receiptItemStore.receiptItem)
  receiptItemStore.clear()
  if (dialog?.value) {
    dialog.value = false
  }
}
function plus(item: Product) {
  quantity.value += 1
  total.value += item.price
  receiptItemStore.receiptItem.quantity = quantity.value
  receiptItemStore.receiptItem.total = total.value
  // receiptStore.calTotal()
}

function minus(item: Product) {
  if (quantity.value > 1) {
    quantity.value -= 1
    total.value -= item.price
    receiptItemStore.receiptItem.quantity = quantity.value
    receiptItemStore.receiptItem.total = total.value
  }
}
</script>
<template>
  <v-dialog v-model="dialog" max-width="550px">
    <v-card max-height="900">
      <v-card-title style="background-color: #415a77; color: white">
        <div style="font-size: 25px; display: flex; justify-content: center">
          {{ productStore.editedProduct.name }}
        </div>
      </v-card-title>

      <div style="margin: 30px 10px">
        <v-row>
          <v-col md="5">
            <v-card color="primary" height="230" style="border-radius: 15px">
              <v-img
                :src="`http://localhost:3000/images/products/${productStore.editedProduct.image}`"
                height="230"
                width="100%"
                cover
                style="pointer-events: none"
              ></v-img
            ></v-card>
          </v-col>
          <v-col md="7">
            <div v-if="productStore.editedProduct.sizes!.length > 0">
              <div style="margin-right: 30px">Size</div>

              <v-select
                class="style"
                v-model="selectedSize"
                variant="outlined"
                :return-object="true"
                :items="productStore.editedProduct.sizes"
                item-title="name"
                item-value="id"
                bg-color="blue-grey-lighten-5"
                required
              ></v-select>
            </div>
            <div v-if="productStore.editedProduct.types!.length > 0">
              <div style="margin-right: 30px">Type</div>

              <v-select
                class="style"
                v-model="selectedType"
                variant="outlined"
                :return-object="true"
                :items="productStore.editedProduct.types"
                item-title="name"
                item-value="id"
                bg-color="blue-grey-lighten-5"
                required
              ></v-select>
            </div>
            <div>
              <div style="margin-right: 30px">Sweet</div>
              <v-select
                class="style"
                v-model="selectedSweet"
                variant="outlined"
                :items="sweet"
                item-title="name"
                item-value="id"
                bg-color="blue-grey-lighten-5"
                required
                append-outer
              ></v-select>
            </div>
          </v-col>
          <v-col md="5"
            ><div style="display: flex; justify-content: center">
              <div style="border: 1px solid black; padding: 10px 20px; border-radius: 15px">
                <v-btn
                  size="smaill"
                  height="100"
                  color="blue-grey-lighten-4"
                  icon="mdi-minus"
                  white="100"
                  @click="minus(productStore.editedProduct)"
                ></v-btn>
                {{ quantity }}

                <v-btn
                  size="smaill"
                  color="blue-grey-lighten-4"
                  icon="mdi-plus"
                  @click="plus(productStore.editedProduct)"
                ></v-btn>
              </div></div
          ></v-col>

          <v-col md="7">
            <v-btn
              color="#599c6a"
              width="100%"
              style="border-radius: 15px"
              @click="selectReceiptItem(productStore.editedProduct)"
              >ADD</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </v-card></v-dialog
  >
</template>
