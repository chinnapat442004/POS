<script setup lang="ts">
import { useLoaderStore } from '@/stores/loader'

const loaderStore = useLoaderStore()
</script>
<template>
  <v-dialog v-model="loaderStore.loading">
    <div class="text-center">
      <v-progress-circular
        color="indigo-darken-2"
        :size="58"
        :width="7"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-dialog>
</template>
