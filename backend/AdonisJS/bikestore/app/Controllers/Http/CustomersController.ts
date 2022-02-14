import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer';
import Staff from 'App/Models/Staff';
import User from 'App/Models/User';

export default class CustomersController {
    public async index({response, auth}:HttpContextContract ) {
        try {
            const manager = await Staff.findByOrFail('user_id', auth.user?.user_id)
            console.log(auth.user?.user_id);
            
            if (manager.manager_id == null) {
                const customer = await Customer.all();
                return response.status(200)
                .json({
                    code:200,
                    statu:'success',
                    data:customer
                });        
            }else{
                throw new Error("AUTHORIZATION ERROR")
                
            }
        } catch (err) {
            return response.status(500).json({
                code:500,
                status:'error',
                message:err.message
            });
        }
        
    }

    public async store({request, response}: HttpContextContract) {
        const input = request.only(['first_name','last_name','username','password','phone','email','street', 'city', 'state', 'zip_code']);
        try{
            const user = await User.create(input)
            const user_id = user.user_id
            try {
                const customer = await Customer.create({
                    user_id: user_id
                })
                return response.status(201).json({
                    code:201,
                    status:'created',
                    data:customer
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

    public async show({response, params, bouncer}:HttpContextContract) {
        try {    
            const customer = await Customer.findByOrFail('customer_id',params.id);

            await bouncer.authorize('viewBalance', customer)
            return response.status(200).json({
                code:200,
                status:'success',
                data:customer
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
        const input = request.only(['balance'])
        try {
            const customer = await Customer.findByOrFail('customer_id',params.id);
            customer?.merge(input);
            await customer?.save();

            return response.status(200).json({
                code:200,
                status:'success',
                data:customer
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
            const customer = await Customer.findByOrFail('customer_id', params.id);
            await customer?.delete();

            return response.status(200).json({
                code:200,
                status:'success',
                data:customer
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
