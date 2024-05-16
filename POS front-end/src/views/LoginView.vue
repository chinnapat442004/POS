<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { VForm } from 'vuetify/components'
const router = useRouter()
const show = ref(false)
const loading = ref(false)
const form = ref<VForm | null>(null)
function onSubmit() {}
const authStore = useAuthStore()

// const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/

async function login() {
  const { valid } = await form.value!.validate()
  await authStore.login()

  if (!valid) return
}

const loginRules = (v: string) => {
  if (!v) {
    return 'false'
  } else if (authStore.getCurrentEmployee() === null) {
    console.log('dfdfs')
    return 'notpass'
  }

  return true
}
onMounted(async () => {
  localStorage.setItem('employee', '')
  localStorage.setItem('access_token', '')
})

// const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
</script>
<template>
  <div style="height: 627px">
    <v-card
      style="margin: auto; margin-top: 80px; border-radius: 10px; background-color: #4f5d75"
      height="500"
      width="600"
    >
      <v-form ref="form" @submit.prevent="onSubmit">
        <div style="text-align: center; font-size: 30px; color: white">Login</div>
        <div style="text-align: center">
          <v-avatar size="180">
            <v-img src="/src/images/noimage.jpg" style="margin: auto"></v-img>
          </v-avatar>
        </div>

        <v-container>
          <div style="font-size: 17px; color: white">Email</div>
          <v-text-field
            class="style"
            :readonly="loading"
            v-model="authStore.email"
            density="compact"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            bg-color="blue-grey-lighten-5"
            variant="outlined"
            :rules="
              [(email) => !!email.match(emailPattern) || 'Invalid email address'] || loginRules
            "
          ></v-text-field>
          <div style="font-size: 17px; color: white" class="align-center justify-space-between">
            Password
          </div>
          <v-text-field
            class="style"
            :rules="[loginRules]"
            v-model="authStore.password"
            :readonly="loading"
            :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
            :type="show ? 'text' : 'password'"
            density="compact"
            bg-color="blue-grey-lighten-5"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="show = !show"
          ></v-text-field>

          <br />

          <v-btn
            @click="login"
            :loading="loading"
            class="style"
            size="large"
            type="submit"
            variant="elevated"
            block
            style="background-color: #0d1b2a; color: white"
          >
            Login
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>
<style>
.style {
  font-family: 'Varela Round', sans-serif;
  font-weight: 500;
  font-style: normal;
}
</style>
