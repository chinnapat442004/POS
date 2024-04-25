<template>
  <v-layout class="rounded rounded-md">
    <router-view name="menu"> </router-view>
    <v-main class="align-center justify-center" style="min-height: 300px">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>
