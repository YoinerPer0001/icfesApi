import examQuestionService from "../services/examQuestionService.js";

class ExamQuestionsController {

    async getExamData(req, res){
        try {
            const {id} = req.params;
            const response = await examQuestionService.getExamInformation(id)
            res.status(response.code).json(response.response)

        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

export default new ExamQuestionsController();