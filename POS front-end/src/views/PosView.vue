<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { useReceiptStore } from '@/stores/receipt'
import { useReceiptItemStore } from '@/stores/receiptItem'
import type { Product } from '@/types/Product'
import type { ReceiptItme } from '@/types/ReceiptItem'
import { onMounted, ref } from 'vue'
const productStore = useProductStore()
const receiptItemStore = useReceiptItemStore()
const receiptStore = useReceiptStore()

onMounted(async () => {
  await productStore.getPorducts()
})

function selectReceiptItem(p: Product) {
  productStore.product = JSON.parse(JSON.stringify(p))
  receiptItemStore.addProduct(p)
  receiptItemStore.addReceiptItem(receiptItemStore.receiptItem)
  receiptItemStore.clear()
}

const tab = ref(null)

function minus(item: ReceiptItme) {
  item.quantity -= 1
  const index = receiptItemStore.receiptItems.indexOf(item)
  item.total -= item.product.price
  if (item.quantity == 0) {
    receiptItemStore.receiptItems.splice(index, 1)
  }
  receiptStore.calTotal()
}

function plus(item: ReceiptItme) {
  item.quantity += 1
  item.total += item.product.price
  receiptStore.calTotal()
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <v-card height="675" style="background-color: white; border-radius: 10px" elevation="5">
          <v-tabs v-model="tab" style="background-color: #0d1b2a; color: white">
            <v-tab value="one">Drinks</v-tab>
            <v-tab value="two">Foods</v-tab>
            <v-tab value="three">Desserts</v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item value="one">
              <v-container>
                <v-row>
                  <v-col
                    v-for="item of productStore.products.filter(
                      (product) => product.category === 'drink'
                    )"
                    :key="item.id"
                    md="4"
                  >
                    <v-card
                      elevation="5"
                      width="160"
                      height="180"
                      style="border-radius: 15px; background-color: #e1e5f2"
                      @click="selectReceiptItem(item)"
                      ><v-img
                        :src="`http://localhost:3000/images/products/${item.image}`"
                        height="150"
                        width="160"
                        cover
                      ></v-img>
                      <div style="text-align: center; margin-top: 3px">{{ item.name }}</div>
                    </v-card>
                  </v-col>
                </v-row></v-container
              >
            </v-window-item>

            <v-window-item value="two">
              <v-container>
                <v-row>
                  <v-col
                    v-for="item of productStore.products.filter(
                      (product) => product.category === 'food'
                    )"
                    :key="item.id"
                    md="4"
                  >
                    <v-card
                      elevation="5"
                      width="160"
                      height="180"
                      style="border-radius: 15px; background-color: #e1e5f2"
                      @click="selectReceiptItem(item)"
                      ><v-img
                        :src="`http://localhost:3000/images/products/${item.image}`"
                        height="150"
                        width="160"
                        cover
                      ></v-img>
                      <div style="text-align: center; margin-top: 3px">{{ item.name }}</div></v-card
                    >
                  </v-col>
                </v-row></v-container
              ></v-window-item
            >

            <v-window-item value="three">
              <v-container>
                <v-row>
                  <v-col
                    v-for="item of productStore.products.filter(
                      (product) => product.category === 'dessert'
                    )"
                    :key="item.id"
                    md="4"
                  >
                    <v-card
                      elevation="5"
                      width="160"
                      height="180"
                      style="border-radius: 15px; background-color: #e1e5f2"
                      @click="selectReceiptItem(item)"
                      ><div>
                        <v-img
                          :src="`http://localhost:3000/images/products/${item.image}`"
                          height="150"
                          width="160"
                          cover
                        ></v-img>
                      </div>
                      <div style="text-align: center; margin-top: 3px">
                        {{ item.name }}
                      </div></v-card
                    >
                  </v-col>
                </v-row></v-container
              ></v-window-item
            >
          </v-window>
        </v-card>
      </v-col>

      <v-col md="6"
        ><v-card height="auto" elevation="5"
          ><v-table height="310" style="background-color: white" class="no-header-scroll">
            <thead style="background-color: #0d1b2a; color: white">
              <tr>
                <th>Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody style="background-color: white">
              <tr v-for="item in receiptItemStore.receiptItems" :key="item.id">
                <td>{{ item.product?.name }}</td>
                <td>{{ item.product?.price }}</td>
                <td>
                  <v-row>
                    <v-btn
                      style="margin-right: 7px"
                      density="compact"
                      icon="mdi-minus"
                      @click="minus(item)"
                    ></v-btn
                    >{{ item.quantity
                    }}<v-btn
                      style="margin-left: 7px"
                      density="compact"
                      icon="mdi-plus"
                      @click="plus(item)"
                    ></v-btn>
                  </v-row>
                </td>
                <td>{{ item.total }}</td>
              </tr>
            </tbody>
          </v-table></v-card
        >
        <v-container></v-container>

        <v-card height="150" elevation="5"> </v-card>
        <v-container></v-container>
        <v-card height="150" elevation="5">
          <div>Total {{ receiptStore.receipt.total }} Baht</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
