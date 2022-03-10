import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Staff from 'App/Models/Staff';
import User from 'App/Models/User';

export default class StaffController {
    public async index({response}:HttpContextContract ) {
        const staff = await Staff.all();
        return response.status(200)
        .json({code:200,
            statu:'success',
            data:staff
        });
    }

    public async store({request, response}: HttpContextContract) {
        const input = request.only(['first_name','last_name','username',
                    'password','phone','email','street', 'city', 'state',
                    'zip_code', 'store_id', 'manager_id']);
        try{
            const user = await User.create(input)
            const user_id = user.user_id
            try {
                const staff = await Staff.create({
                    user_id: user_id
                })
                return response.status(201).json({
                    code:201,
                    status:'created',
                    data:staff
                });  
            } catch (err) {
                await user.delete()
                return response.status(500).json({
                    code:500,
                    status:'error',
                    message:err.message
                });
            }
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
            const staff = await Staff.findByOrFail('user_id',params.id);
            return response.status(200).json({
                code:200,
                status:'success',
                data:staff
            })
        } catch (err) {
            return response.status(404).json({
                code:404,
                status:'error',
                message:err.message
            })
        }
         
    }

    public async isStaff({response, auth}:HttpContextContract) {
        try {
            const staff = await Staff.findByOrFail('user_id',auth.user?.user_id);
            return response.status(201).json({
                code:201,
                status:'success',
                data:staff
            })
        } catch (err) {
            return response.status(200).json({
                code:404,
                status:'error',
                data:null
            })
        }
         
    }

    public async update({request, response, params}:HttpContextContract) {
        const input = request.only(['store_id', 'manager_id'])
        try {
            const staff = await Staff.findByOrFail('staff_id',params.id);
            staff?.merge(input);
            await staff?.save();

            return response.status(200).json({
                code:200,
                status:'success',
                data:staff
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
            const staff = await Staff.findByOrFail('staff_id', params.id);
            await staff?.delete();

            return response.status(200).json({
                code:200,
                status:'success',
                data:staff
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
