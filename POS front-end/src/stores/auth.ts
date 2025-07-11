import { defineStore } from 'pinia'
import authService from '@/service/aunth'
import { ref } from 'vue'
import type { Employee } from '@/types/Employee'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const email = ref('')
  const password = ref('')
  const currentEmployee = ref<Employee>()

  async function login() {
    try {
      const res = await authService.auth(email.value, password.value)

      if (res) {
        res.data.access_token
        localStorage.setItem('employee', JSON.stringify(res.data.employee))
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('role', res.data.employee.role)
        await router.replace({ name: 'pos' })
      }
    } catch (e: any) {
      console.log(e.message)
    }
  }

  // async function getCurrentEmployee(): Employee | null {
  //   const employeeData = localStorage.getItem('employee')
  //   if (employeeData != null) {
  //     currentEmployee.value = await JSON.parse(employeeData)
  //     if (currentEmployee.value) return currentEmployee.value
  //   }
  //   return null
  // }

  async function getCurrentEmployee(): Promise<Employee | null> {
    const employeeData = localStorage.getItem('employee')
    if (employeeData) {
      currentEmployee.value = await JSON.parse(employeeData)
      if (currentEmployee.value) return currentEmployee.value
    }
    return null
  }

  function clearCurrentEmployee() {
    localStorage.setItem('employee', '')
    localStorage.setItem('access_token', '')
    localStorage.setItem('role', '')
    router.replace({ name: 'login' })
  }
  return { login, getCurrentEmployee, clearCurrentEmployee, currentEmployee, email, password }
})
