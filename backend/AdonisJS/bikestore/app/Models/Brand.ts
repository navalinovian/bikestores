// import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Brand extends BaseModel {
  public static table = 'production.brands'
  @column({ isPrimary: true })
  public brand_id: number

  @column()
  public brand_name:string

  // @column.dateTime({ autoCreate: true })
  // public createdAt: DateTime

  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // public updatedAt: DateTime
  @hasMany(()=> Product,{
    foreignKey:'brand_id'
  })
  public products:HasMany<typeof Product>
}
