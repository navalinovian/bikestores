import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  public static table = 'user.users'
  @column({ isPrimary: true })
  public user_id: number

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public email: string

  @column()
  public username: string

  @column({serializeAs:null})
  public password: string

  @column()
  public phone: number

  @column()
  public state: string

  @column()
  public city: string

  @column()
  public street: string

  @column()
  public zip_code: number

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public deleted_at: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
