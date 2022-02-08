import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Staff extends BaseModel {
  @column({ isPrimary: true })
  public staff_id: number

  @column()
  public user_id: number


  @column()
  public store_id: number


  @column()
  public manager_id: number

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime({serializeAs:null})
  public deleted_at: DateTime

}
