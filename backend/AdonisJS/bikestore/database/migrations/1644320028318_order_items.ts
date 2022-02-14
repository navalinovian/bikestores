import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrderItems extends BaseSchema {
  protected tableName = 'sales.order_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('item_id').primary()
      table.integer('order_id').unsigned().references('order_id').inTable('sales.orders').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('product_id').notNullable().unsigned().references('product_id').inTable('production.products').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('quantity').notNullable()
      table.decimal('list_price', 10 , 2).notNullable()
      table.decimal('discount',4,2).notNullable().defaultTo(0)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
