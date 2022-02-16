import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Customer extends BaseModel {
  public static table = 'sales.customers'
  @column({ isPrimary: true })
  public customer_id: number

  @column()
  public user_id: number

  @belongsTo(()=> User)
  public user: BelongsTo<typeof User>

  @column()
  public balance: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs:null})
  public deletedAt: DateTime

  
}
