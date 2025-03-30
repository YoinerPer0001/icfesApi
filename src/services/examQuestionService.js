import examsQuestionRepository from "../repository/examsQuestionRepository.js"
import examsService from "./examsService.js"

class ExamQuestionService {
    async create(data, dbTransaction){
        const response = await examsQuestionRepository.create(data, dbTransaction)
        if(!response) return {code: 500, response: "error to create"}

        return {code: 200, response: response}
    }

    async getExamInformation(id){

        const exist = await examsService.getById(id)
      
        if(exist.code != 200) return {code: 404, response: "exam not found"}

        const response = await examsQuestionRepository.getById(id)
      
        if(!response) return {code: 500, response: "error to ask"}

        return {code: 200, response: response}
    }
}

export default new ExamQuestionService();