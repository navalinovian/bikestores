import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Store from 'App/Models/Store';

export default class StoresController {
    public async index({response}:HttpContextContract ) {
        const store = await Store.all();
        return response.status(200)
        .json({code:200,
            statu:'success',
            data:store
        });
    }

    public async store({request, response}: HttpContextContract) {
        const input = request.only(['store_name','phone','email','street', 'city', 'state', 'zip_code']);
        try{
            const store = await Store.create(input)
            return response.status(201).json({
                code:201,
                status:'created',
                data:store
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
            const store = await Store.findByOrFail('store_id',params.id);
            return response.status(200).json({
                code:200,
                status:'success',
                data:store
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
        const input = request.only(['store_name','phone','email','street', 'city', 'state', 'zip_code'])
        try {
            const store = await Store.findByOrFail('store_id',params.id);
            store?.merge(input);
            await store?.save();

            return response.status(200).json({
                code:200,
                status:'success',
                data:store
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
            const store = await Store.findByOrFail('store_id', params.id);
            await store?.delete();

            return response.status(200).json({
                code:200,
                status:'success',
                data:store
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
