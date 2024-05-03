import { defineStore } from 'pinia'
import authService from '@/service/aunth'
import { ref } from 'vue'
import type { Employee } from '@/types/Employee'

export const useAuthStore = defineStore('auth', () => {
  const email = ref('employee1@mail.com')
  const password = ref('Pass@1234')
  const currentEmployee = ref<Employee>()

  async function login() {
    const res = await authService.auth(email.value, password.value)
    localStorage.setItem('employee', JSON.stringify(res.data.employee))
    localStorage.setItem('access_token', res.data.access_token)
  }

  async function getCurrentEmployee() {
    const employeeData = localStorage.getItem('employee')
    if (employeeData != null) {
      currentEmployee.value = await JSON.parse(employeeData)
    }

    console.log(currentEmployee.value?.name)
  }
  return { login, getCurrentEmployee, currentEmployee }
})
