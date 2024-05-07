<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { inject, type Ref } from 'vue'

const dialog = inject<Ref<boolean>>('logoutDialog')
const authStore = useAuthStore()

function closeDelete() {
  if (dialog) dialog.value = false
}

async function logout() {
  if (dialog) {
    authStore.clearCurrentEmployee()
  }
}
</script>
<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card height="170px">
      <v-card-title
        class="text-h5"
        style="font-family: 'Varela Round', sans-serif; font-weight: 500; font-style: normal"
        >Confirm Logout</v-card-title
      >
      <v-card-text>Are you sure you want to logout?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn style="background-color: #f0f8ff" @click="closeDelete">Cancel</v-btn>
        <v-btn style="background-color: #76abae" color="white" @click="logout">lotgout</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
