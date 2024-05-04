import { Role, User } from "@prisma/client"

export interface IUser extends User {
  roles: Role[]
}

export default class CreateUserPayload {
  email: string
  userId: string
  roles: Role[]

  constructor (model: IUser) {
    this.email = model.email
    this.userId = model.userId
    this.roles = model.roles
  }
}