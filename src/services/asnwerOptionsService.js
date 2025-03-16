import answerOptionsRepository from '../repository/answerOptionsRepository.js'

class AnswerOptionService {
    async getById(id){
        const response = await answerOptionsRepository.getById(id)
        if(!response) return {code: 404, response: "not found"}

        return {code: 200, response: response}
    }
}

export default new AnswerOptionService();