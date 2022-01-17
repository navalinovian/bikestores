import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Brand from 'App/Models/Brand'

export default class BrandsController {
    public async index({response}:HttpContextContract ) {
        const brand = await Brand.all();
        return response.status(200)
        .json({code:200,
            statu:'success',
            data:brand
        });
    }

    public async store({request, response}: HttpContextContract) {
        const input = request.only(['brand_name']); // TODO : Validation
        try{
            const brand = await Brand.create(input)
            return response.status(201).json({
                code:201,
                status:'created',
                data:brand
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
            const brand = await Brand.findByOrFail('brand_id',params.id);
            return response.status(200).json({
                code:200,
                status:'success',
                data:brand
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
        const input = request.only(['brand_name'])
        try {
            const brand = await Brand.findByOrFail('brand_id',params.id);
            brand?.merge(input);
            await brand?.save();

            return response.status(200).json({
                code:200,
                status:'success',
                data:brand
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
            const brand = await Brand.findByOrFail('brand_id', params.id);
            await brand?.delete();

            return response.status(200).json({
                code:200,
                status:'success',
                data:brand
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
