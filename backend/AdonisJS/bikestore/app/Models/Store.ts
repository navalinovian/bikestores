import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

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

  @manyToMany(()=> Product,{
    localKey:'store_id',
    pivotForeignKey:'store_id',
    relatedKey:'product_id',
    pivotRelatedForeignKey:'product_id',
    pivotColumns:['store_name'],
    pivotTable:'production.stocks'
  })
  public stocks:ManyToMany<typeof Product>
}
