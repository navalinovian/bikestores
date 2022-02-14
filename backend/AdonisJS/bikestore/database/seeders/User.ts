import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run () {
    // Write your database queries inside the run method

    const usr1 = new User()
    usr1.first_name= 'superadmin'
    usr1.last_name= 'admin'
    usr1.email= 'admin@example.com'
    usr1.username='superadmin'
    usr1.password='!Q2w3e4r5t6y7u8i'

    await usr1.save()
  }
}
