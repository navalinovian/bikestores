import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Category extends BaseModel {
  public static table = 'production.categories'
  @column({ isPrimary: true })
  public category_id: number

  @column()
  public category_name:string
}
