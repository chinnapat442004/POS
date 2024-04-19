<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(true)
</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
      <v-list-item
        style="background-color: rgb(50, 50, 50); color: white"
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
        nav
      >
        <template v-slot:append>
          <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-coffee"
          title="Point of Sale"
          value="pos"
          :to="{ name: 'pos' }"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="align-center justify-center" style="min-height: 300px">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>
