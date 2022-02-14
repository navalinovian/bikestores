import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import Store from 'App/Models/Store';
export default class ProductsController {
    public async index({response}:HttpContextContract ) {
        const product = await Product.all();
        return response.status(200)
        .json({code:200,
            statu:'success',
            data:product
        });
    }

    public async store({request, response}: HttpContextContract) {
        const input = request.only(['product_name','brand_id','category_id',
        'model_year', 'list_price']);
        const extra = request.only(['stores_id','quantity'])
        
        try{
            const product = await Product.firstOrCreate(input)

            await Store.findOrFail(extra.stores_id)
            await product.related('stocks').attach({
                [extra.stores_id]:{
                    quantity:extra.quantity
                }
            })
            return response.status(201).json({
                code:201,
                status:'created',
                data:product
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
            const product = await Product.findByOrFail('product_id',params.id);
            return response.status(200).json({
                code:200,
                status:'success',
                data:product
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
        const input = request.only(['product_name','brand_id','category_id','model_year', 'list_price'])
        try {
            const product = await Product.findByOrFail('product_id',params.id);
            product?.merge(input);
            await product?.save();

            return response.status(200).json({
                code:200,
                status:'success',
                data:product
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
            const product = await Product.findByOrFail('product_id', params.id);
            await product?.delete();

            return response.status(200).json({
                code:200,
                status:'success',
                data:product
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
