import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'production.products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('product_id').primary()
      table.string('product_name').notNullable()
      table.integer('brand_id').notNullable().unsigned().references('brand_id').inTable('production.brands').onUpdate('CASCADE')
      table.integer('category_id').notNullable().unsigned().references('category_id').inTable('production.categories').onUpdate('CASCADE')
      table.integer('model_year').notNullable()
      table.decimal('list_price',10,2)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
