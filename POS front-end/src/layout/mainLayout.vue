<script setup lang="ts">
import Loader from '@/components/LoaderComponent.vue'
</script>

<template>
  <v-layout class="rounded rounded-md">
    <router-view name="menu"> </router-view>
    <router-view name="header"> </router-view>
    <v-main class="align-center justify-center" style="min-height: 300px">
      <router-view></router-view>
      <Loader></Loader>
    </v-main>
  </v-layout>
</template>
