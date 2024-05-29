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
    <v-list-item style="background-color: #0d1b2a; height: 55px; color: white" nav>
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <div>
            <div style="display: inline-block; margin-left: 10px">
              <h4 style="font-size: 20px; font-weight: bold">
                {{ authStore.currentEmployee?.name }}
              </h4>
            </div>

            <div style="display: inline-block; margin-left: 25px">
              <v-btn icon v-bind="props" style="width: 100%; height: 100%">
                <v-avatar>
                  <v-img
                    :src="`http://localhost:3000/images/employees/${authStore.currentEmployee?.image}`"
                  ></v-img
                ></v-avatar>
              </v-btn>
            </div>
          </div>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar>
                <v-img
                  :src="`http://localhost:3000/images/employees/${authStore.currentEmployee?.image}`"
                ></v-img>
              </v-avatar>
              <h3>{{ authStore.currentEmployee?.name }}</h3>
              <p class="text-caption mt-1">
                {{ authStore.currentEmployee?.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded> Edit Account </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded> Disconnect </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>

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
        prepend-icon="mdi-history"
        title="History"
        value="history"
        :to="{ name: 'history' }"
      ></v-list-item>
      <v-list-item
        class="list"
        prepend-icon="mdi-clock-check-outline"
        title="Check In Check Out"
        value="check-in"
        :to="{ name: 'check-in' }"
      ></v-list-item>

      <v-list-group value="management">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            title="Management"
            class="list"
            prepend-icon="mdi-pencil"
          ></v-list-item>
        </template>
        <v-list-item
          class="list"
          prepend-icon="mdi-food"
          title="Product"
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
        <v-list-item
          class="list"
          prepend-icon="mdi-account"
          title="Member"
          value="member"
          :to="{ name: 'member' }"
        ></v-list-item>
        <v-list-item
          class="list"
          prepend-icon="mdi-archive-outline"
          title="Raw Material"
          value="raw-material"
          :to="{ name: 'raw-material' }"
        ></v-list-item>
        <v-list-item
          class="list"
          prepend-icon="mdi-sale"
          title="Promotion"
          value="promotion"
          :to="{ name: 'promotion' }"
        ></v-list-item>
      </v-list-group>

      <v-list-item
        class="list"
        prepend-icon="mdi-chart-bar"
        title="Chart"
        value="chart"
        :to="{ name: 'chart' }"
      ></v-list-item>

      <v-list-item
        style="position: fixed; bottom: 2px; width: 95%"
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
