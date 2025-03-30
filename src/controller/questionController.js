import questionService from "../services/questionService.js";


class QuestionController {

    async createQuestion (req, res){
        try {
            const data = req.body
         
            const response = await questionService.create(data)
            return res.status(response.code).json(response.response)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

export default new QuestionController()