import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Customers extends BaseSchema {
  protected tableName = 'sales.customers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('customer_id').primary()
      table.integer('user_id').notNullable().unsigned().references('user_id').inTable('user.users').onUpdate('CASCADE').onDelete('CASCADE').unique()
      table.decimal('balance',2).notNullable().defaultTo(0.0)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
