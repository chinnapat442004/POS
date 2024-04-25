<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(true)
</script>

<template>
  <v-layout>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      style="background-color: #4f5d75"
    >
      <v-list-item
        style="background-color: #0d1b2a; color: white"
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
          class="list"
          prepend-icon="mdi-coffee"
          title="Point of Sale"
          value="pos"
          :to="{ name: 'pos' }"
        ></v-list-item>
        <v-list-item
          class="list"
          prepend-icon="mdi-food"
          title="Procudt"
          value="product"
          :to="{ name: 'product' }"
        ></v-list-item>
        <v-list-item
          class="list"
          prepend-icon="mdi-account-group"
          title="Employee"
          value="employee"
          :to="{ name: 'employee' }"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="align-center justify-center" style="min-height: 300px">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Noto+Sans+Display:wght@500&family=Varela+Round&display=swap');
.list {
  font-family: 'Varela Round', sans-serif;
  font-weight: 600;
  font-style: normal;
  background-color: #e1e5f2;
}
</style>
