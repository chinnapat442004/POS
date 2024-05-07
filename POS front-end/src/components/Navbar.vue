<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

import { ref, onMounted } from 'vue'
import { provide } from 'vue'
const authStore = useAuthStore()
const drawer = ref(true)
const rail = ref(true)
const dialog = ref(false)
import conformLogoutDialog from '@/views/ConfirmLogoutDialog.vue'

provide('logoutDialog', dialog)

onMounted(async () => {
  console.log(localStorage.getItem('employee'))
  await authStore.getCurrentEmployee()
})

function confirmLogout() {
  dialog.value = true
}
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
    style="background-color: #4f5d75"
  >
    <v-list-item
      style="background-color: #0d1b2a; color: white"
      :prepend-avatar="`http://localhost:3000/images/employees/${authStore.currentEmployee?.image}`"
      nav
    >
      <h4 style="font-size: 20px; font-weight: bold">{{ authStore.currentEmployee?.name }}</h4>
      <template v-slot:append>
        <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="default" nav>
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
      <div style="height: 425px"></div>
      <v-list-item
        class="list"
        prepend-icon="mdi-logout"
        title="Logout"
        value="employee"
        @click="confirmLogout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <conformLogoutDialog></conformLogoutDialog>
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
