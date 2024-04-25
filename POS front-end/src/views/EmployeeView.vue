<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'
import EditedProductDialog from './EditedProductDialog.vue'
import type { Product } from '@/types/Product'

import { useEmployeeStore } from '@/stores/employee'

const employeeStore = useEmployeeStore()
const search = ref('')
const deleteDialog = ref(false)
provide('deleteDialog', deleteDialog)

const dialog = ref(false)
provide('editedProcuctDialog', dialog)

onMounted(async () => {
  await employeeStore.getEmployees()
})

const headers = [
  { title: 'Id', value: 'id', key: 'id' },
  { title: 'Image', value: 'image', key: 'image' },
  { title: 'Name', value: 'name', key: 'name' },
  { title: 'Email', value: 'email', key: 'email' },
  { title: 'Role', value: 'role', key: 'role' },
  { title: 'Actions', key: 'actions', sortable: false }
]
</script>
<template>
  <v-card elevation="5" height="648" style="margin: 30px 50px">
    <v-row>
      <v-data-table
        height="530"
        :headers="headers"
        :items="employeeStore.employees"
        :search="search"
        :header-props="{ style: 'background-color: #e1e5f2;  font-weight: 800; ' }"
      >
        <template v-slot:top>
          <v-toolbar flat style="background-color: #0d1b2a; color: white; margin-top: 12px">
            <v-toolbar-title style="background-color: #0d1b2a; color: white">
              <v-row
                ><v-col md="6">
                  <div style="margin: 10px 0px 0px 10px; font-size: 25px">Employee</div>
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
                <v-col md="2"> </v-col></v-row
            ></v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:item.image="{ item }">
          <v-img
            :src="`http://localhost:3000/images/employees/${item.image}`"
            width="150"
            height="130"
            cover
            style="border-radius: 15px; margin-top: 10px; margin-bottom: 10px; pointer-events: none"
          >
          </v-img>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon class="me-2" size="small" @click="open(item)"> mdi-pencil </v-icon>
          <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-row>
  </v-card>

  <!-- <DeleteProductDialog></DeleteProductDialog> -->
</template>
