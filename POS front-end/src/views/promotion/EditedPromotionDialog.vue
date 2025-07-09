<script setup lang="ts">
import { usePromotionStore } from '@/stores/promotion'
import { inject, type Ref } from 'vue'
import Swal from 'sweetalert2'
const promotionStore = usePromotionStore()
const dialog = inject<Ref<boolean>>('editedPromotionDialog')

async function openDialog() {
  if (dialog) dialog.value = true
}

function close() {
  promotionStore.clear()
  if (dialog) dialog.value = false
}

async function save() {
  await promotionStore.addPromotion()
  await promotionStore.getPromotions()
  if (dialog) dialog.value = false
  Swal.fire({
    title: 'Success',
    text: 'Your date was saved!',
    icon: 'success'
  })
  promotionStore.clear()
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
        <span class="style"> Promotoin </span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                variant="outlined"
                v-model="promotionStore.editedPromotion.name"
                label="Name"
                bg-color="blue-grey-lighten-5"
                class="style"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <div style="font-size: 17px" class="align-center justify-space-between">
                Start Date
              </div>
              <v-text-field
                style="background: white; color: #0d1b2a; border-radius: 15px"
                bg-color="blue-grey-lighten-5"
                v-model="promotionStore.editedPromotion.start_date"
                class="style"
                variant="outlined"
                type="Date"
              ></v-text-field
            ></v-col>
            <v-col md="6">
              <div style="font-size: 17px" class="align-center justify-space-between">End Date</div>
              <v-text-field
                style="background: white; color: #0d1b2a; border-radius: 15px"
                class="style"
                variant="outlined"
                v-model="promotionStore.editedPromotion.end_date"
                bg-color="blue-grey-lighten-5"
                hide-details
                single-line
                type="Date"
              ></v-text-field
            ></v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                class="style"
                variant="outlined"
                v-model="promotionStore.editedPromotion.mininum"
                label="Mininum"
                type="number"
                min="0"
                bg-color="blue-grey-lighten-5"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                class="style"
                variant="outlined"
                v-model="promotionStore.editedPromotion.maxinum"
                label="Maxinum"
                type="number"
                min="0"
                bg-color="blue-grey-lighten-5"
              ></v-text-field>
            </v-col>
            <!-- <v-col md="6">
              <div style="font-size: 17px" class="align-center justify-space-between">
                Start time
              </div>
              <v-text-field
                style="background: white; color: #0d1b2a; border-radius: 15px"
                class="style"
                variant="outlined"
                bg-color="blue-grey-lighten-5"
                hide-details
                single-line
                type="time"
              ></v-text-field
            ></v-col>
            <v-col md="6">
              <div style="font-size: 17px" class="align-center justify-space-between">End time</div>
              <v-text-field
                style="background: white; color: #0d1b2a; border-radius: 15px"
                class="style"
                variant="outlined"
                bg-color="blue-grey-lighten-5"
                hide-details
                single-line
                type="time"
              ></v-text-field
            ></v-col> -->
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                class="style"
                variant="outlined"
                v-model="promotionStore.editedPromotion.discount_late"
                label="Discount Late"
                type="number"
                min="0"
                bg-color="blue-grey-lighten-5"
              ></v-text-field>
            </v-col>
            <!-- <v-col cols="12" md="6" sm="6">
              <v-text-field
                class="style"
                variant="outlined"
                v-model="promotionStore.editedPromotion.discount_price"
                label="Maxinum"
                type="number"
                min="0"
                bg-color="blue-grey-lighten-5"
              ></v-text-field>
            </v-col> -->
            <v-col cols="12" md="10">
              <v-text-field
                class="style"
                variant="outlined"
                v-model="promotionStore.editedPromotion.products"
                label="Product"
                min="0"
                bg-color="blue-grey-lighten-5"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn color="red"> Add</v-btn>
            </v-col>
            <!-- <v-col cols="12" md="6" sm="6">
              <v-select
                class="style"
                v-model="productStore.editedProduct.category"
                variant="outlined"
                :items="items"
                label="Category"
                bg-color="blue-grey-lighten-5"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-card height="150" width="160">
                <v-img
                  :src="`http://localhost:3000/images/products/${productStore.editedProduct.image}`"
                  v-model="productStore.editedProduct.files"
                  height="150"
                  width="160"
                  cover
                ></v-img>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-file-input
                v-model="productStore.editedProduct.files"
                style="margin-top: 50px"
                variant="outlined"
                bg-color="blue-grey-lighten-5"
              ></v-file-input>
            </v-col> -->
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
