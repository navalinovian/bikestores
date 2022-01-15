import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Brand from 'App/Models/Brand'

export default class BrandsController {
    public async index(ctx: HttpContextContract ) {
        return Brand.all()
    }

    public async store({request, response}) {
        const body = request.body() // TODO : Validation

        const brand = await Brand.create(body)
        response.status(201)
        return brand
    }

    public async show({params}:HttpContextContract) {
        return Brand.findOrFail(params.id)
    }

    public async update({params}:HttpContextContract) {
        return 'PUT Brand' + params.id
    }

    public async delete({params}:HttpContextContract) {
        return 'Delete Brand' + params.id
    }
}       
