<script setup lang="ts">
import { useRawMaterailStore } from '@/stores/rawMaterial'

import { onMounted, ref } from 'vue'

const rawMaterialStore = useRawMaterailStore()
const status = ref('check stock')
const selected = ref('check stock')

onMounted(async () => {
  await rawMaterialStore.gerRawMaterials()
})
</script>

<template>
  <v-btn
    style="margin-left: 50px; margin-top: 10px"
    :color="selected === 'check stock' ? '#0d1b2a' : 'white'"
    @click="(status = 'check stock'), (selected = 'check stock')"
    >check stock</v-btn
  >
  <v-btn
    :color="selected === 'import stock' ? '#0d1b2a' : 'white'"
    style="margin-top: 10px"
    @click="(status = 'import stock'), (selected = 'import stock')"
    >import stock</v-btn
  >
  <div v-if="status === 'check stock'">
    <v-card height="648" style="margin: 0px 50px">
      <v-toolbar flat style="background-color: #0d1b2a; color: white">
        <v-toolbar-title style="background-color: #0d1b2a; color: white">
          <div style="margin: 0px 0px 0px 10px; font-size: 25px">Check Stock</div>
        </v-toolbar-title>
      </v-toolbar>
      <v-table height="525px">
        <thead>
          <tr>
            <th class="text-left">Id</th>
            <th class="text-left">Name</th>
            <th class="text-left">Status</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in rawMaterialStore.rawMaterials" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>
              <v-chip
                style="border-radius: 20px; width: 110px; justify-content: center"
                :color="
                  item.status == 'In stock'
                    ? 'green'
                    : item.status == 'Row stock'
                      ? 'orange'
                      : 'red'
                "
                :text="item.status"
                label
                >{{ item?.status }}</v-chip
              >
            </td>
            <td>{{ item.quantity }}</td>
            <td width="200px">
              <v-text-field
                v-model="rawMaterialStore.editedRawMaterial.quantity"
                type="number"
                white="20px"
                min="0"
                :max="item.quantity"
              ></v-text-field>
            </td>
          </tr>
        </tbody>
      </v-table>

      <div style="display: flex; justify-content: center">
        <v-btn color="#fe6d73">Cancle</v-btn>
        <v-btn color="#588157">Save</v-btn>
      </div>
    </v-card>
  </div>
  <div v-else>
    <v-card height="648" style="margin: 0px 50px">
      <v-toolbar flat style="background-color: #0d1b2a; color: white">
        <v-toolbar-title style="background-color: #0d1b2a; color: white">
          <div style="margin: 0px 0px 0px 10px; font-size: 25px">Import Stock</div>
        </v-toolbar-title>
      </v-toolbar>
      <div style="overflow: auto; height: 100%">
        <div style="margin: 30px">
          <v-row>
            <v-col md="3" sm="12"> <v-text-field label="store"></v-text-field></v-col>

            <v-col md="3" sm="12"> <v-text-field type="date"></v-text-field></v-col>
            <v-divider :thickness="3"></v-divider
            ><v-col md="2" sm="12">
              <v-autocomplete
                label="ID"
                :items="['1', '2', '3', '4', '5', '6']"
              ></v-autocomplete></v-col
            ><v-col md="4" sm="12">
              <div style="display: flex">
                <v-autocomplete
                  label="Autocomplete"
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                ></v-autocomplete
                ><v-btn height="55" color="primary " prepend-icon="mdi-plus"> </v-btn>
              </div>
            </v-col>

            <v-col md="3" sm="12"> <v-text-field></v-text-field></v-col
            ><v-col md="3" sm="12"> <v-text-field></v-text-field></v-col>
            <v-col>
              <div style="display: flex; justify-content: center">
                <v-btn
                  color="primary"
                  prepend-icon="mdi-plus"
                  style="display: flex; justify-content: center"
                  >add</v-btn
                >
              </div></v-col
            ></v-row
          >
        </div>
        <div style="margin: 0px 30px 30px 30px">
          <v-table style="margin-bottom: 20px"
            ><thead style="background-color: #0d1b2a; color: white">
              <tr>
                <th>adsfds</th>
                <th>adsfds</th>
                <th>adsfds</th>
                <th>adsfds</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>324</td>
                <td>2342</td>
                <td>324</td>
                <td>2342</td>
              </tr>
              <tr>
                <td>324</td>
                <td>2342</td>
                <td>324</td>
                <td>2342</td>
              </tr>
            </tbody></v-table
          >
          <v-row>
            <v-col md="4" sm="12"></v-col>
            <v-col md="2" sm="12"> <v-btn color="#fe6d73" width="100%">cancle</v-btn></v-col>
            <v-col md="2" sm="12"> <v-btn color="#588157" width="100%">save</v-btn></v-col
            ><v-col md="4" sm="12"></v-col
          ></v-row>
        </div>
      </div>
    </v-card>
  </div>
</template>
