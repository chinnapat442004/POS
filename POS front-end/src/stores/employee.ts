import type { Employee } from '@/types/Employee'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import employeeService from '@/service/employee'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref(<Employee[]>[])

  const initialEmployee: Employee & { files: File[] } = {
    email: '',
    password: '',
    name: '',
    role: '',
    image: 'noimage.jpg',
    files: []
  }
  const editedEmployee = ref(
    <Employee & { files: File[] }>JSON.parse(JSON.stringify(initialEmployee))
  )
  async function getEmployees() {
    const res = await employeeService.getEmployees()
    employees.value = res.data
  }

  function addEmployee() {
    const employee = editedEmployee
    if (!employee.value.id) {
      employeeService.addEmployee(employee.value)
    }
  }

  function clearEditedEmployee() {
    editedEmployee.value = JSON.parse(JSON.stringify(initialEmployee))
  }

  return { getEmployees, clearEditedEmployee, addEmployee, employees, editedEmployee }
})
