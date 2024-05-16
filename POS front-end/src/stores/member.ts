import type { Member } from '@/types/Member'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import memberService from '@/service/member'

export const useMemberStore = defineStore('member', () => {
  const members = ref<Member[]>([])

  async function getMembers() {
    const res = await memberService.getMembers()
    members.value = res.data
  }

  return {
    getMembers,
    members
  }
})
