import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
// import { rules,schema } from '@ioc:Adonis/Core/Validator'
export default class UsersController {
    public async index({response}:HttpContextContract ) {
        const user = await User.all();
        return response.status(200)
        .json({code:200,
            statu:'success',
            data:user
        });
    }

    public async register({request, response}: HttpContextContract) {
        const input = request.only(['first_name','last_name','username','password','phone','email','street', 'city', 'state', 'zip_code']);
        try{
            // const validation = await schema.create({
            //     email: schema.string({},[rules.email(), rules.unique({table:'user.users', column:'email'})]),
            //     // password: schema.string({},[rules.confirmed()]),
            //     username:schema.string({},[rules.unique({table:'user.users', column:'username'})])
            // })
            // const valid = await request.validate({schema:validation})
            const user = await User.create(input)
                return response.status(201).json({
                code:201,
                status:'created',
                data:user
            });
        }catch(err){
            return response.status(500).json({
                code:500,
                status:'error',
                message:err.message
            });
        }
        
        
    }

    public async show({response, params}:HttpContextContract) {
        try {
            const user = await User.findByOrFail('user_id',params.id);
            return response.status(200).json({
                code:200,
                status:'success',
                data:user
            })
        } catch (err) {
            return response.status(404).json({
                code:404,
                status:'error',
                message:err.message
            })
        }
         
    }

    public async update({request, response, params}:HttpContextContract) {
        const input = request.only(['first_name','last_name','password','phone','email','street', 'city', 'state', 'zip_code'])
        try {
            const user = await User.findByOrFail('user_id',params.id);
            user?.merge(input);
            await user?.save();

            return response.status(200).json({
                code:200,
                status:'success',
                data:user
            });
        } catch (err) {
            return response.status(500).json({
                code:500,
                status:'error',
                message:err.message
            });
        }
        
    }

    public async destroy({response, params}:HttpContextContract) {
        try {
            const user = await User.findByOrFail('user_id', params.id);
            await user?.softDelete('deletedAt');
            
            return response.status(200).json({
                code:200,
                status:'success',
                data:user
            });
        } catch (err) {
            return response.status(500).json({
                code:500,
                status:'error',
                message:err.message
            })
        }
    }
}
