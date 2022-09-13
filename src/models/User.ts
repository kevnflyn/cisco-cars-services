import { userDeleteQuery, userInsertQuery, userSelectQuery } from "./userQueries"

export interface UserModel {
  id: number
  email: string
  password: string
}

export class User {
  email: string
  password: string
  hasConfirmedEmail: boolean

  constructor(email: string, password: string, hasConfirmedEmail: boolean) {
    this.email=email
    this.password=password
    this.hasConfirmedEmail=hasConfirmedEmail
  }

  async save(): Promise<UserModel> {
    const user = await process.db.query(
      userInsertQuery,
      [this.email, this.password, this.hasConfirmedEmail])
    return user
  }

  static async fetchByEmail(email: string): Promise<UserModel> {
    const {rows: [user]} = await process.db.query(userSelectQuery, [email])
    return user
  }

  static async deleteByEmail(email: string) {
    await process.db.query(userDeleteQuery, [email])
    return null
  }
}
