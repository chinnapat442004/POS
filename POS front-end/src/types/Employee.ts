import type { Branch } from './Breach'

type Employee = {
  id?: number
  email: string
  password: string
  name: string
  role: string
  image: string
  branch?: Branch
}
export { type Employee }
