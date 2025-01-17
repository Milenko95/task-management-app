import { Role } from "./roles.enum"

export interface User {
    name: string,
    email: string,
    role: Role
}