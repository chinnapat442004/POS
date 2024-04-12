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
    <v-card width="500px">
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="one">Drink</v-tab>
        <v-tab value="two">Item Two</v-tab>
        <v-tab value="three">Item Three</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            One

            {{ productStore.products }}
          </v-window-item>

          <v-window-item value="two"> Two </v-window-item>

          <v-window-item value="three"> Three </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>
