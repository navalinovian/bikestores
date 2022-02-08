import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'sales.orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('order_id').primary()
      table.integer('customer_id').unsigned().references('customer_id').inTable('sales.customers').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('store_id').notNullable().unsigned().references('store_id').inTable('sales.stores').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('staff_id').notNullable().unsigned().references('staff_id').inTable('sales.staffs').onUpdate('NO ACTION').onDelete('NO ACTION')
      table.tinyint('order_status')
      table.date('order_date').notNullable()
      table.date('required_date').notNullable()
      table.date('shipped_date').nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
