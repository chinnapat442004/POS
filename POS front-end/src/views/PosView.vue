<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { onMounted, ref } from 'vue'
const productStore = useProductStore()

onMounted(() => {
  productStore.getPorducts()
})
const tab = ref(null)
</script>
<template>
  <v-container>
    <v-card width="600px">
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="one">Drink</v-tab>
        <v-tab value="two">Item Two</v-tab>
        <v-tab value="three">Item Three</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="one">
          <v-container>
            <v-row>
              <v-col v-for="item of productStore.products" :key="item.id" md="4">
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

        <v-window-item value="two"> Two </v-window-item>

        <v-window-item value="three"> Three </v-window-item>
      </v-window>
    </v-card>
  </v-container>
</template>
