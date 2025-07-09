<script setup lang="ts">
import { useRawMaterailStore } from '@/stores/rawMaterial'
import { inject, type Ref } from 'vue'
import Swal from 'sweetalert2'
const rawMaterialStore = useRawMaterailStore()
const dialog = inject<Ref<boolean>>('editedRawMateriolDialog')

async function openDialog() {
  if (dialog) dialog.value = true
}

async function close() {
  if (dialog) dialog.value = await false
  rawMaterialStore.clear()
}

async function save() {
  await rawMaterialStore.save()
  await rawMaterialStore.gerRawMaterials()
  Swal.fire({
    title: 'Success',
    text: 'Your date was saved!',
    icon: 'success'
  })
  rawMaterialStore.clear()
  rawMaterialStore.gerRawMaterials()

  if (dialog) dialog.value = false
}
</script>

<template>
  <v-dialog
    class="dialog"
    v-model="dialog"
    persistent
    max-width="600px"
    width="600"
    style="
      @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Noto+Sans+Display:wght@500&family=Varela+Round&display=swap;');
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-weight: 600;
      font-style: normal;
    "
  >
    <template v-slot:activator="{ props }">
      <v-btn
        class="style"
        dark
        v-bind="props"
        @click="openDialog()"
        width="150  "
        style="background-color: #6792bd"
        prepend-icon="mdi-plus"
        >Add New
      </v-btn>
    </template>
    <v-card>
      <v-card-title style="background-color: #415a77; color: white">
        <span class="style"> Raw Material </span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                variant="outlined"
                v-model="rawMaterialStore.editedRawMaterial.name"
                label="Name"
                bg-color="blue-grey-lighten-5"
                class="style"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                style="background: white; color: #0d1b2a; border-radius: 15px"
                bg-color="blue-grey-lighten-5"
                v-model="rawMaterialStore.editedRawMaterial.minimum"
                label="Minimum"
                class="style"
                variant="outlined"
              ></v-text-field
            ></v-col>
            <v-col md="6">
              <v-text-field
                style="background: white; color: #0d1b2a; border-radius: 15px"
                class="style"
                variant="outlined"
                v-model="rawMaterialStore.editedRawMaterial.price"
                bg-color="blue-grey-lighten-5"
                label="Price"
              ></v-text-field
            ></v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                class="style"
                variant="outlined"
                v-model="rawMaterialStore.editedRawMaterial.quantity"
                label="Quantity"
                type="number"
                min="0"
                bg-color="blue-grey-lighten-5"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                class="style"
                variant="outlined"
                v-model="rawMaterialStore.editedRawMaterial.unit"
                label="Unit"
                bg-color="blue-grey-lighten-5"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" class="style" variant="text" @click="close()"> Cancel </v-btn>
        <v-btn color="blue-darken-1" class="style" variant="text" @click="save()"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style scoped>
.style {
  font-family: 'Varela Round', sans-serif;
  font-weight: 500;
  font-style: normal;
}
</style>
