import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, beforeFind, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import Order from './Order'
import Product from './Product'

export default class OrderProduct extends BaseModel {
  @column({ isPrimary: true })
  public order_product_id: number

  @column()
  public order_id: number

  @belongsTo(()=>Order,{
    localKey:'order_id'
  })
  public order:BelongsTo<typeof Order>

  @column()
  public product_id: number

  @belongsTo(()=>Product,{
    localKey:'product_id'
  })
  public product:BelongsTo<typeof Product>

  @column()
  public quantity: number

  @column()
  public list_price: number

  @column()
  public discount: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs:null })
  public deletedAt: DateTime

  @beforeFind()
  public static softDeletesFind= softDeleteQuery;

  @beforeFetch()
  public static softDeletesFetch= softDeleteQuery;

  public async softDelete(column?:string){
    await softDelete(this, column)
  }
}
