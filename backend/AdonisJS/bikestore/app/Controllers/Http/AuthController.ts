import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const password = await request.input('password');
    const email = await request.input('email');
    
    try {
      const user = await User.query().where('email', email).whereNull('deletedAt').firstOrFail();
      
      if (await Hash.verify(user.password, password)) {
        const token = await auth.use('api').generate(user);
        
        return response.status(200).json({
          code:200,
          status:'success',
          user: user,
          token:token
        })
      }
    } catch(err) {
      return response
        .status(400)
        .send({ error: { message: err.message } });
    }
  }
}
