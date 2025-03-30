import { fn } from 'sequelize'
import Questions from '../model/questionModel.js'
import db from '../core/db.js'

class QuestionRepository {

    async create(data, transaction = null){
       
        let dbTransaction;

        if(transaction != null){
            dbTransaction = transaction
        }else{
            console.log("nulo transaction")
            dbTransaction = await db.transaction()
        }
        const response = await Questions.create(data, {transaction: dbTransaction});
        
        return {response, dbTransaction}
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