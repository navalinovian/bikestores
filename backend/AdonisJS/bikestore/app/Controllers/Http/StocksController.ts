import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';

export default class StocksController {

    public async getStock(store, product){
        const stock = await Database.query()
            .from('production.stocks')
            .select(
                Database.from('sales.stores')
                .select('store_name')
                .where('store_id', store)
                .as('store_name'),
                Database.from('production.products')
                .select('product_name')
                .where('product_id', product)
                .as('product_name'),
                 'quantity'
            ).where('product_id', product)
            .andWhere('store_id', store)
        return stock
    }

    public async show({response, params}:HttpContextContract) {
        try {
            if (params.product) {
                const stock = await this.getStock(params.store, params.product)    
                return response.status(200).json({
                    code:200,
                    status:'success',
                    data:stock
                })
            }else{
                const stock = await Database.query()
                .from('production.stocks')
                .select(
                Database.from('production.products')
                .select('product_name')
                .where('product_id', params.product)
                .as('product_name'),
                 'quantity'
                ).where('product_id', params.product)
                return response.status(200).json({
                    code:200,
                    status:'success',
                    data:stock
                })
            }
        } catch (err) {
            return response.status(404).json({
                code:404,
                status:'error',
                message:err.message
            })
        }
         
    }

    public async addStock({request, response}:HttpContextContract){
        const input = request.only(['store_id', 'product_id', 'quantity']);
        try {
            const stock = await this.getStock(input.store_id, input.product_id);
            if (stock.length) {
                const add = parseInt(stock[0].quantity) + parseInt(input.quantity) ;
                await Database.query().from('production.stocks')
                .update({quantity:add},['store_id','product_id','quantity'])
                .where('store_id',input.store_id)
                .andWhere('product_id',input.product_id);    
            }else{
                const stock = await Database.insertQuery()
                .table('production.stocks')
                .insert({
                    store_id:input.store_id,
                    product_id:input.product_id,
                    quantity:input.quantity
                })
                return response.status(201).json({
                    code:201,
                    status:'created',
                    data:stock
                });
            }
            
        } catch (err) {
            return response.status(500).json({
                code:500,
                status:'error',
                message:err.message
            })
        }
    }
}
