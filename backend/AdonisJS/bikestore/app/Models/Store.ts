import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Stock from './Stock'

export default class Store extends BaseModel {
  public static table = 'sales.stores'
  @column({ isPrimary: true })
  public store_id: number

  @column()
  public store_name:string

  @column()
  public phone:number

  @column()
  public email:string

  @column()
  public street:string

  @column()
  public city:string

  @column()
  public state:string

  @column()
  public zip_code:number

  @hasMany(()=> Stock,{
    foreignKey:'store_id'
  })
  public stock:HasMany<typeof Stock>
}
