import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order';

export default class OrdersController {
    public async index({response}:HttpContextContract ) {
        const order = await Order.all();
        return response.status(200)
        .json({code:200,
            statu:'success',
            data:order
        });
    }

    public async store({request, response}: HttpContextContract) {
        const input = request.only(['customer_id','store_id','staff_id',
        'order_status', 'required_date','order_date','shipped_date']);
        try{
            const order = await Order.create(input)
            return response.status(201).json({
                code:201,
                status:'created',
                data:order
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
            const order = await Order.findByOrFail('order_id',params.id);
            return response.status(200).json({
                code:200,
                status:'success',
                data:order
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
        const input = request.only(['order_status', 'required_date', 'shipped_date'])
        try {
            const order = await Order.findByOrFail('order_id',params.id);
            order?.merge(input);
            await order?.save();

            return response.status(200).json({
                code:200,
                status:'success',
                data:order
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
            const order = await Order.findByOrFail('order_id', params.id);
            await order?.delete();

            return response.status(200).json({
                code:200,
                status:'success',
                data:order
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
