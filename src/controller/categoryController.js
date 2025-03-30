import categoryService from "../services/categoryService.js";


class CategoryController {

    async getAllCategories(req, res){
        try {
            const response = await categoryService.getAll()
            res.status(response.code).json(response.response)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

}

export default new CategoryController();