import type { Member } from '@/types/Member'
import http from './http'

function getMembers() {
  return http.get('/members')
}

function getMemberByPhone(phone: string) {
  return http.get(`members/phone/${phone}`)
}

function deleteMember(member: Member) {
  return http.delete(`members/${member.id}`)
}

function getMember(member: Member) {
  return http.get(`members/${member.id}`)
}

export default { getMembers, getMemberByPhone, deleteMember, getMember }
