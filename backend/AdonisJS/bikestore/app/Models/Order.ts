import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, beforeFind, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import Store from './Store'
import Staff from './Staff'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'

export default class Order extends BaseModel {
  public static table = 'sales.orders'
  @column({ isPrimary: true })
  public order_id: number

  @column()
  public customer_id:number

  @belongsTo(()=> Customer,{
    localKey:'customer_id'
  })
  public customer:BelongsTo<typeof Customer>

  @column()
  public store_id:number

  @belongsTo(()=> Store,{
    localKey:'store_id'
  })
  public store:BelongsTo<typeof Store>

  @column()
  public staff_id:number

  @belongsTo(()=> Staff,{
    localKey:'Staff_id'
  })
  public staff:BelongsTo<typeof Staff>

  @column()
  public order_status:number

  @column()
  public required_date:Date

  @column()
  public shipped_date:Date

  @column.dateTime({ autoCreate: true })
  public order_date: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public deletedAt: DateTime

  @beforeFind()
  public static softDeletesFind= softDeleteQuery;

  @beforeFetch()
  public static softDeletesFetch= softDeleteQuery;

  public async softDelete(column?:string){
    await softDelete(this, column)
  }
}
