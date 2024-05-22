<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'
import EditedEmployeeDialog from './EditedEmployeeDialog.vue'
import DeleteEmployeeDialog from './DeleteEmployeeDialog.vue'
import { useEmployeeStore } from '@/stores/employee'
import type { Employee } from '@/types/Employee'
import { useAuthStore } from '@/stores/auth'

const employeeStore = useEmployeeStore()
const search = ref('')
const deleteDialog = ref(false)
const authStore = useAuthStore()
provide('deleteEmployeeDialog', deleteDialog)

const dialog = ref(false)
provide('editedEmployeeDialog', dialog)

onMounted(async () => {
  await authStore.getCurrentEmployee()
  if (authStore.currentEmployee) {
    await employeeStore.getEmployeesByBranch(authStore.currentEmployee)
  }
})

async function open(item: Employee) {
  await employeeStore.clearEditedEmployee()
  // employeeStore.editedEmployee = await Object.assign({}, item)
  employeeStore.getEmployee(item)
  dialog.value = true
}
async function deleteItem(item: Employee) {
  // employeeStore.editedEmployee = await Object.assign({}, item)
  employeeStore.getEmployee(item)
  deleteDialog.value = true
}

const headers = [
  { title: 'Id', value: 'id', key: 'id' },
  { title: 'Image', value: 'image', key: 'image' },
  { title: 'Name', value: 'name', key: 'name' },
  { title: 'Email', value: 'email', key: 'email' },
  { title: 'Role', value: 'role', key: 'role' },
  { title: 'Actions', key: 'actions', sortable: false }
]
</script>
<template>
  <v-card elevation="5" height="648" style="margin: 30px 50px">
    <v-row>
      <v-data-table
        height="530"
        :headers="headers"
        :items="employeeStore.employees"
        :search="search"
        :header-props="{ style: 'background-color: #e1e5f2;  font-weight: 800; ' }"
      >
        <template v-slot:top>
          <v-toolbar flat style="background-color: #0d1b2a; color: white; margin-top: 12px">
            <v-toolbar-title style="background-color: #0d1b2a; color: white">
              <v-row
                ><v-col md="6">
                  <div style="margin: 10px 0px 0px 10px; font-size: 25px">Employee</div>
                </v-col>
                <v-col md="4">
                  <v-text-field
                    style="background: white; color: #0d1b2a; border-radius: 15px"
                    v-model="search"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    hide-details
                    single-line
                    color="white"
                  ></v-text-field
                ></v-col>
                <v-col md="2">
                  <div style="margin: 10px 10px 0px 0px">
                    <edited-employee-dialog></edited-employee-dialog>
                  </div> </v-col></v-row
            ></v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:[`item.image`]="{ item }">
          <v-img
            :src="`http://localhost:3000/images/employees/${item.image}`"
            width="150"
            height="150"
            cover
            style="border-radius: 15px; margin-top: 10px; margin-bottom: 10px; pointer-events: none"
          >
          </v-img>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon class="me-2" size="small" @click="open(item)" color="#263238">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)" color="#E57373"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-row>
  </v-card>

  <delete-employee-dialog></delete-employee-dialog>
</template>
