import type { Employee } from '@/types/Employee'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import employeeService from '@/service/employee'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref(<Employee[]>[])

  async function getEmployees() {
    const res = await employeeService.getEmployees()
    employees.value = res.data
  }

  return { getEmployees, employees }
})
