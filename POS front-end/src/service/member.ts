import type { Member } from '@/types/Member'
import http from './http'

function getMembers() {
  return http.get('/members')
}

function getMemberByPhone(phone: string) {
  return http.get(`/members/phone/${phone}`)
}

function deleteMember(member: Member) {
  return http.delete(`/members/${member.id}`)
}

function getMember(member: Member) {
  return http.get(`/members/${member.id}`)
}

function addMember(member: Member) {
  return http.post('/members', member)
}

function updateMember(member: Member) {
  return http.patch(`/members/${member.id}`, member)
}

export default { getMembers, getMemberByPhone, deleteMember, getMember, addMember, updateMember }
