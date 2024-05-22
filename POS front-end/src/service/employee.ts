import type { Employee } from '@/types/Employee'
import http from './http'

function getEmployees() {
  return http.get('/employees')
}

function getEmployee(employee: Employee) {
  return http.get(`/employees/${employee.id}`)
}

function addEmployee(employee: Employee & { files: File[] }) {
  const fromData = new FormData()
  fromData.append('email', employee.email)
  fromData.append('password', employee.password)
  fromData.append('name', employee.name)
  fromData.append('role', employee.role)
  if (employee.files && employee.files.length > 0) {
    fromData.append('file', employee.files[0])
  }

  return http.post('/employees', fromData, { headers: { 'Content-Type': 'multipart/form-data' } })
}
function updateEmployee(employee: Employee & { files: File[] }) {
  const fromData = new FormData()
  fromData.append('email', employee.email)
  fromData.append('password', employee.password)
  fromData.append('name', employee.name)
  fromData.append('role', employee.role)
  if (employee.files && employee.files.length > 0) {
    fromData.append('file', employee.files[0])
  }
  return http.post(`/employees/${employee.id}`, fromData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

function removeEmployee(employee: Employee) {
  return http.delete(`/employees/${employee.id}`)
}

function getEmployeeByBranch(employee: Employee) {
  return http.get(`/employees/branch/${employee.branch?.id}`)
}

export default {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  removeEmployee,
  getEmployeeByBranch
}
