import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stores extends BaseSchema {
  protected tableName = 'sales.stores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('store_id').primary()
      table.string('store_name').notNullable()
      table.integer('phone',25)
      table.string('email').unique()
      table.string('street')
      table.string('city',50)
      table.string('state',50)
      table.string('zip_code',5)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
