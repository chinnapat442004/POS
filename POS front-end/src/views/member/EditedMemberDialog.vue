<script setup lang="ts">
import { useMemberStore } from '@/stores/member'
import { inject, type Ref, ref } from 'vue'
import Swal from 'sweetalert2'
const memberStore = useMemberStore()
const dialog = inject<Ref<boolean>>('editedMemberDialog')
const page = inject<Ref<boolean>>('memberPage')

async function close() {
  if (dialog) dialog.value = false
  await memberStore.clearEditedMember()
}

async function save() {
  if (dialog) {
    await memberStore.addMember()
    await memberStore.getMembers()
    dialog.value = false
    Swal.fire({
      title: 'Success',
      text: 'Your date was saved!',
      icon: 'success'
    })
    await memberStore.clearEditedMember()
  }
}

async function openDialog() {
  if (dialog) dialog.value = true
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="500"
    style="
      @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Noto+Sans+Display:wght@500&family=Varela+Round&display=swap;');
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-weight: 600;
      font-style: normal;
    "
  >
    <template v-if="page === true" v-slot:activator="{ props }">
      <v-btn
        class="mb-2"
        dark
        v-bind="props"
        @click="openDialog()"
        width="150  "
        style="background-color: #6792bd"
        prepend-icon="mdi-plus"
        >Add New
      </v-btn>
    </template>

    <v-card>
      <v-card-title style="background-color: #415a77; color: white">
        <span class="style"> Member </span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                class="style"
                variant="outlined"
                v-model="memberStore.editedMember.name"
                label="Name"
                bg-color="blue-grey-lighten-5"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-text-field
                class="style"
                variant="outlined"
                v-model="memberStore.editedMember.phone"
                label="Phone"
                bg-color="blue-grey-lighten-5"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="close()"> Cancel </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save()"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style scoped>
.style {
  font-family: 'Varela Round', sans-serif;
  font-weight: 500;
  font-style: normal;
}
</style>
