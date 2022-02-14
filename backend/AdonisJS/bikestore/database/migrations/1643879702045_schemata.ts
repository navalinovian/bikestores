import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Schemata extends BaseSchema {
  public async up () {
    this.schema.createSchema('production')
    this.schema.createSchema('sales')
    this.schema.createSchema('user')
  }

  public async down () {
    this.schema.dropSchema('production')
    this.schema.dropSchema('sales')
    this.schema.dropSchema('user')
  }
}
