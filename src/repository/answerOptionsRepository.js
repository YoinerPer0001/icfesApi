import AnswerOptions from "../model/answersOptionsModel.js";

class AnswerOptionRepository {
    async getById(id){
        const response = await AnswerOptions.findByPk(id);
        return response
    }
}

export default new AnswerOptionRepository();