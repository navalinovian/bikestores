import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order';
import OrderProduct from 'App/Models/OrderProduct';

export default class OrderProductsController {
    public async index({response}:HttpContextContract ) {
        const orderProduct = await OrderProduct.all();
        return response.status(200)
        .json({code:200,
            statu:'success',
            data:orderProduct
        });
    }

    public async store({request, response}: HttpContextContract) {
        const OrderInput = request.only(['customer_id','store_id','staff_id',
        'order_status', 'required_date','order_date','shipped_date'])
        const OProductInput = request.body()
        console.log(OrderInput);
        
        try {
            const order = await Order.create(OrderInput)
            const orderId = order.order_id
            try{
                await Promise.all(OProductInput.map(async (element) => {
                    const orderProduct = await OrderProduct.create({
                        order_id:orderId,
                        product_id:element.product_id,
                        quantity:element.quantity,
                        discount:element.discount
                    })
                    console.log(orderProduct);
                    
                  }));
                const finalOrder = Order.findByOrFail('order_id', orderId);
                return response.status(201).json({
                    code:201,
                    status:'created',
                    data:finalOrder
                });
            }catch(err){
                return response.status(500).json({
                    code:500,
                    status:'error',
                    message:err.message
                });
            }
        } catch (error) {
            return response.status(500).json({
                code:500,
                status:'error',
                message:error.message
            });
        }
        
        
        
    }

    public async show({response, params}:HttpContextContract) {
        try {
            const orderProduct = await OrderProduct.findByOrFail('order_id',params.id);
            return response.status(200).json({
                code:200,
                status:'success',
                data:orderProduct
            })
        } catch (err) {
            return response.status(404).json({
                code:404,
                status:'error',
                message:err.message
            })
        }
         
    }

    // public async update({request, response, params}:HttpContextContract) {
    //     const input = request.only(['order_status', 'required_date', 'shipped_date'])
    //     try {
    //         const orderProduct = await OrderProduct.findByOrFail('order_id',params.id);
    //         orderProduct?.merge(input);
    //         await orderProduct?.save();

    //         return response.status(200).json({
    //             code:200,
    //             status:'success',
    //             data:orderProduct
    //         });
    //     } catch (err) {
    //         return response.status(500).json({
    //             code:500,
    //             status:'error',
    //             message:err.message
    //         });
    //     }
        
    // }

    public async destroy({response, params}:HttpContextContract) {
        try {
            const orderProduct = await OrderProduct.findByOrFail('order_id', params.id);
            await orderProduct?.delete();

            return response.status(200).json({
                code:200,
                status:'success',
                data:orderProduct
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
