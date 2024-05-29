<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'

import { useRawMaterailStore } from '@/stores/rawMaterial'
import type { Promotion } from '@/types/Promotion'

const rawMaterialStore = useRawMaterailStore()
const search = ref('')
const deleteDialog = ref(false)
provide('deleteDialog', deleteDialog)

const promotionDialog = ref(false)
provide('editedPromotionDialog', promotionDialog)

onMounted(async () => {
  await rawMaterialStore.gerRawMaterials()
})

const headers = [
  { title: 'Id', value: 'id', key: 'id' },
  { title: 'Name', value: 'name', key: 'name', width: '200px' },
  { title: 'Price', value: 'price', key: 'price' },
  { title: 'Minimum', value: 'minimum', key: 'minimum' },
  { title: 'Quantity', value: 'quantity', key: 'quantity' },
  { title: 'Unit', value: 'unit', key: 'unit', width: '50px' },
  { title: 'Status', value: 'status', key: 'status', width: '120px', align: 'center' },
  { title: 'Actions', key: 'actions', sortable: false, width: '120px' }
]
</script>
<template>
  <v-card elevation="5" height="648" style="margin: 30px 50px">
    <v-row>
      <v-data-table
        height="530"
        :headers="headers"
        :items="rawMaterialStore.rawMaterials"
        :search="search"
        :header-props="{ style: 'background-color: #e1e5f2;  font-weight: 800; ' }"
      >
        <template v-slot:top>
          <v-toolbar flat style="background-color: #0d1b2a; color: white; margin-top: 12px">
            <v-toolbar-title style="background-color: #0d1b2a; color: white">
              <v-row
                ><v-col md="6">
                  <div style="margin: 10px 0px 0px 10px; font-size: 25px">Promotion</div>
                </v-col>
                <v-col md="4">
                  <v-text-field
                    style="background: white; color: #0d1b2a; border-radius: 15px"
                    v-model="search"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    hide-details
                    single-line
                    color="white"
                  ></v-text-field
                ></v-col>
                <v-col md="2">
                  <div style="margin: 10px 10px 0px 0px">
                    <EditedPromotionDialog></EditedPromotionDialog></div></v-col></v-row
            ></v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:[`item.image`]="{ item }">
          <v-img
            :src="`http://localhost:3000/images/products/${item.image}`"
            width="150"
            height="130"
            cover
            style="border-radius: 15px; margin-top: 10px; margin-bottom: 10px; pointer-events: none"
          >
          </v-img>
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            style="border-radius: 20px; width: 110px; justify-content: center"
            :color="
              item.status == 'In stock' ? 'green' : item.status == 'Row stock' ? 'orange' : 'red'
            "
            :text="item.status"
            label
          ></v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon class="me-2" size="small" @click="open(item)" color="#263238">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)" color="#E57373"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-row>
  </v-card>
</template>
