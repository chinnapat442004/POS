<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { useReceiptItemStore } from '@/stores/receiptItem'
import type { Product } from '@/types/Product'
import { onMounted, ref } from 'vue'
const productStore = useProductStore()
const receiptItemStore = useReceiptItemStore()

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
</script>
<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <v-card max-width="700">
          <v-tabs v-model="tab" style="background-color: rgb(50, 50, 50); color: white">
            <v-tab value="one">Drinks</v-tab>
            <v-tab value="two">Foods</v-tab>
            <v-tab value="three">Desserts</v-tab>
          </v-tabs>

          <v-window v-model="tab" style="background-color: rgb(180, 180, 180)">
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
                    <v-card elevation="2" width="160" @click="selectReceiptItem(item)"
                      ><v-img
                        :src="`http://localhost:3000/images/products/${item.image}`"
                        height="150"
                      ></v-img>
                      {{ item.name }}</v-card
                    >
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
                    <v-card elevation="2" width="160" @click="selectReceiptItem(item)"
                      ><v-img
                        :src="`http://localhost:3000/images/products/${item.image}`"
                        height="150"
                      ></v-img>
                      {{ item.name }}</v-card
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
                    <v-card elevation="2" width="160" @click="selectReceiptItem(item)"
                      ><v-img
                        :src="`http://localhost:3000/images/products/${item.image}`"
                        height="150"
                      ></v-img>
                      {{ item.name }}</v-card
                    >
                  </v-col>
                </v-row></v-container
              ></v-window-item
            >
          </v-window>
        </v-card>
      </v-col>
      <v-col md="6"
        ><v-card width="700" height="450"
          ><v-table>
            <thead style="background-color: rgb(50, 50, 50); color: white">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody style="background-color: rgb(180, 180, 180)">
              <tr v-for="item in receiptItemStore.receiptItems" :key="item.id">
                <td>{{ item.product?.name }}</td>
                <td>{{ item.product?.price }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.amount }}</td>
              </tr>
            </tbody>
          </v-table></v-card
        >
      </v-col>
    </v-row>
  </v-container>
</template>
