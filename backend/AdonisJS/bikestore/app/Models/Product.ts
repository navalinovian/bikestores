import { BaseModel, belongsTo, column, BelongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Brand from './Brand'
import Category from './Category'
import Store from './Store'

export default class Product extends BaseModel {
  public static table = 'production.products'
  @column({ isPrimary: true })
  public product_id: number

  @column()
  public product_name:string

  @column()
  public brand_id:number

  @belongsTo(()=> Brand,{
    localKey:'brand_id'
  })
  public brand:BelongsTo<typeof Brand>

  @column()
  public category_id:number

  @belongsTo(()=> Category,{
    localKey:'category_id'
  })
  public category:BelongsTo<typeof Category>

  @column()
  public model_year:number

  @column()
  public list_price:number

  @manyToMany(()=> Store,{
    localKey:'product_id',
    pivotForeignKey:'product_id',
    relatedKey:'store_id',
    pivotRelatedForeignKey:'store_id',
    pivotColumns:['product_name'],
    pivotTable:'production.stocks'
  })
  public stocks:ManyToMany<typeof Store>
}
