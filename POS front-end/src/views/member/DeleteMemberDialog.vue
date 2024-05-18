<script setup lang="ts">
import { useMemberStore } from '@/stores/member'
import { inject, type Ref } from 'vue'
const memberStore = useMemberStore()
const dialog = inject<Ref<boolean>>('deleteMemberDialog')

function closeDelete() {
  if (dialog) dialog.value = false
}

async function deleteItemConfirm() {
  await memberStore.deleteMember()
  await memberStore.getMembers()
  if (dialog) dialog.value = false
}
</script>
<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card height="170px">
      <v-card-title
        class="text-h5"
        style="font-family: 'Varela Round', sans-serif; font-weight: 500; font-style: normal"
        >Confirm Delete</v-card-title
      >
      <v-card-text>Are you sure you want to delete this item?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn style="background-color: #f0f8ff" @click="closeDelete">Cancel</v-btn>
        <v-btn style="background-color: #fe6d73" color="white" @click="deleteItemConfirm"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
