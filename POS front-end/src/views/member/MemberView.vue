<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useMemberStore } from '@/stores/member'
import type { Member } from '@/types/Member'
import { provide } from 'vue'
import DeleteMemberDialog from './DeleteMemberDialog.vue'
import EditedMemberDialog from './EditedMemberDialog.vue'

const memberStore = useMemberStore()
const search = ref('')

const deleteDialog = ref(false)
provide('deleteMemberDialog', deleteDialog)
const editedDialog = ref(false)
provide('editedMemberDialog', editedDialog)

function deleteItem(item: Member) {
  memberStore.getMember(item)
  deleteDialog.value = true
}

function open(item: Member) {
  memberStore.getMember(item)
  editedDialog.value = true
}

onMounted(async () => {
  await memberStore.getMembers()
})

const headers = [
  { title: 'Id', value: 'id', key: 'id' },
  { title: 'Name', value: 'name', key: 'name' },
  { title: 'Phone', value: 'phone', key: 'phone' },
  { title: 'Point', value: 'point', key: 'point' },
  { title: 'Actions', key: 'actions', sortable: false }
]
</script>
<template>
  <v-card elevation="5" height="648" style="margin: 30px 50px">
    <v-row>
      <v-data-table
        height="530"
        :headers="headers"
        :items="memberStore.members"
        :search="search"
        :header-props="{ style: 'background-color: #e1e5f2;  font-weight: 800; ' }"
      >
        <template v-slot:top>
          <v-toolbar flat style="background-color: #0d1b2a; color: white; margin-top: 12px">
            <v-toolbar-title style="background-color: #0d1b2a; color: white">
              <v-row
                ><v-col md="6">
                  <div style="margin: 10px 0px 0px 10px; font-size: 25px">Member</div>
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
                    <EditedMemberDialog></EditedMemberDialog>
                  </div> </v-col></v-row
            ></v-toolbar-title>
          </v-toolbar>
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
  <DeleteMemberDialog></DeleteMemberDialog>
</template>
