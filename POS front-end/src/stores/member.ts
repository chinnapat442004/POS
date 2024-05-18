import type { Member } from '@/types/Member'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import memberService from '@/service/member'
import { useLoaderStore } from './loader'

export const useMemberStore = defineStore('member', () => {
  const members = ref<Member[]>([])
  const loaderStore = useLoaderStore()
  const initialMember: Member = {
    name: '',
    point: 0,
    phone: ''
  }

  const memberPhone = ref(<Member>JSON.parse(JSON.stringify(initialMember)))
  const editedMember = ref(<Member>JSON.parse(JSON.stringify(initialMember)))

  async function getMembers() {
    await loaderStore.doLoad()
    const res = await memberService.getMembers()
    members.value = res.data
    await loaderStore.finishLoad()
  }

  async function getMember(member: Member) {
    const res = await memberService.getMember(member)
    editedMember.value = res.data
  }

  async function getMemberByPhone(phone: string) {
    const res = await memberService.getMemberByPhone(phone)
    memberPhone.value = res.data
  }

  function deleteMember() {
    const member = editedMember.value
    memberService.deleteMember(member)
    clearEditedMember()
  }

  function clearEditedMember() {
    editedMember.value = JSON.parse(JSON.stringify(initialMember))
  }

  return {
    getMembers,
    getMemberByPhone,
    deleteMember,
    getMember,
    memberPhone,
    members
  }
})
