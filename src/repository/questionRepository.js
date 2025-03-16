import { fn } from 'sequelize'
import Questions from '../model/questionModel.js'

class QuestionRepository {

    async create(examInfo){
        const response = await Questions.create(examInfo)
        return response
    }

    async update(id, data){
        const response = await Questions.update(data, {where: {id: id}})
        return response
    }

    async getById(id){
        const response = await Questions.findByPk(id)
        return response
    }

    async getQuestionForExam(number, course){
        const response = await Questions.findAll({
            where: {cat_id: course},
            order: fn("RANDOM"),
            limit: number 
        })

        return response
    }

}

export default new QuestionRepository();