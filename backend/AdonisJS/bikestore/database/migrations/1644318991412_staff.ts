import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Staff extends BaseSchema {
  protected tableName = 'sales.staffs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('staff_id').primary()
      table.integer('user_id').notNullable().unsigned().references('user_id').inTable('user.users').onDelete('CASCADE')
      table.integer('store_id').notNullable().unsigned().references('store_id').inTable('sales.stores').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('manager_id').nullable().unsigned().references('staff_id').inTable('sales.staffs').onUpdate('NO ACTION').onDelete('NO ACTION')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

