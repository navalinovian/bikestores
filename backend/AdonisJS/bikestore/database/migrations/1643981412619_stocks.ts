import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stocks extends BaseSchema {
  protected tableName = 'production.stocks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('product_id').notNullable().unsigned().references('product_id').inTable('production.products').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('store_id').notNullable().unsigned().references('store_id').inTable('sales.stores').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('quantity').defaultTo(0)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
