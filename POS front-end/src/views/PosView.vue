<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { onMounted, ref } from 'vue'
const productStore = useProductStore()

onMounted(async () => {
  await productStore.getPorducts()
})

const tab = ref(null)
</script>
<template>
  <v-container>
    <v-card max-width="600px">
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
                <v-card elevation="2" width="160" @click=""
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
                <v-card elevation="2" width="160" @click=""
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
                <v-card elevation="2" width="160" @click=""
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
  </v-container>
</template>
