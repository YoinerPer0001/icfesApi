import categoryRepository from "../repository/categoryRepository.js"

class CategoryService {

    async getById(id){
        const response = await categoryRepository.getById(id)

        if(!response) return {code: 404, response: ""}

        return {code: 200, response: response}
    }

    async getAll(){
        const response = await categoryRepository.getAll()

        if(!response) return {code: 500, response: ""}

        return {code: 200, response: response}
    }
}

export default new CategoryService();