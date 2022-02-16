import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Store from './Store'

export default class Staff extends BaseModel {
  public static table = 'sales.staffs'
  @column({ isPrimary: true })
  public staff_id: number

  @column()
  public user_id: number

  @belongsTo(()=> User,{
    localKey:'user_id',
  })
  public user:BelongsTo<typeof User>

  @column()
  public store_id: number

  @belongsTo(()=> Store,{
    localKey:'store_id',
  })
  public store:BelongsTo<typeof Store>

  @column()
  public manager_id: number

  @belongsTo(()=> Staff,{
    localKey:'manager_id',
  })
  public manager:BelongsTo<typeof Staff>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime({serializeAs:null})
  public deleted_at: DateTime

  

}
