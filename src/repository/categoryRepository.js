import Category from "../model/categoryModel.js"


class CategoryRepository {

    async create(examInfo){
        const response = await Category.create(examInfo)
        return response
    }

    async update(id, data){
        const response = await Category.update(data, {where: {id: id}})
        return response
    }

    async getById(id){
        const response = await Category.findByPk(id)
        return response
    }
}

export default new CategoryRepository();