import Context from "../model/contextModel.js"
import db from "../core/db.js"

class ContextRepository {

    async create(data){
        const ContextDbTransaction = await db.transaction()
        const response = await Context.create(data)
        return {response, ContextDbTransaction}
    }

    async update(id, data){
        const response = await Context.update(data, {where: {id: id}})
        return response
    }

    async getById(id){
        const response = await Context.findByPk(id)
        return response
    }
}

export default new ContextRepository ()