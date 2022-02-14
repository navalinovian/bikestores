import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, beforeFind, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'

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
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({serializeAs:null})
  public deletedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  @beforeFind()
  public static softDeletesFind= softDeleteQuery;

  @beforeFetch()
  public static softDeletesFetch= softDeleteQuery;

  public async softDelete(column?:string){
    await softDelete(this, column)
  }
}
