import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Staff from 'App/Models/Staff';
import User from 'App/Models/User';
// import { rules,schema } from '@ioc:Adonis/Core/Validator'
export default class UsersController {
    public async index({response,auth}:HttpContextContract ) {
        try {
            const staff = await Staff.findByOrFail('user_id', auth.user?.user_id)
            if (staff) {
                const user = await User.all();
                return response.status(200)
                .json({code:200,
                    statu:'success',
                    data:user
                });
            }else{
                throw new Error("AUTHORIZATION ERROR")
            }
        } catch (error) {
            return response.status(500).json({
                code:500,
                status:'error',
                message:error.message
            });
        }
        
    }

    public async register({request, response}: HttpContextContract) {
        const input = request.only(['first_name','last_name','username','password','phone','email','street', 'city', 'state', 'zip_code']);
        try{
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
