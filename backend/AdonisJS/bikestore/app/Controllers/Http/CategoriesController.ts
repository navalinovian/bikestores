import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';

export default class CategoriesController {
    public async index({response,}:HttpContextContract ) {
        const category = await Category.all();
        return response.status(200)
        .json({code:200,
            status:'success',
            data:category
        });
    }

    public async store({request, response}: HttpContextContract) {
        const input = request.only(['category_name']); // TODO : Validation
        try{
            const category = await Category.create(input)
            return response.status(201).json({
                code:201,
                status:'created',
                data:category
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
            const category = await Category.findByOrFail('category_id',params.id);
            return response.status(200).json({
                code:200,
                status:'success',
                data:category
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
        const input = request.only(['category_name'])
        try {
            const category = await Category.findByOrFail('category_id',params.id);
            category?.merge(input);
            await category?.save();

            return response.status(200).json({
                code:200,
                status:'success',
                data:category
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
            const category = await Category.findByOrFail('category_id', params.id);
            await category?.delete();

            return response.status(200).json({
                code:200,
                status:'success',
                data:category
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
