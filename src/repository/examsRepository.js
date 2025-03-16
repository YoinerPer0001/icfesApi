import Exams from "../model/examsModel.js";
import db from "../core/db.js";

class ExamsRepository {

    

    async create(examInfo){
        const dbTransaction = await db.transaction()
        const response = await Exams.create(examInfo, {transaction: dbTransaction})
        const data = {
            id : response.dataValues.id,
            state: response.dataValues.state,
            duration: response.dataValues.duration,
            course_id: response.dataValues.course_id
        }
        return {response: data , dbTransaction}
    }

    async update(id, data){
        const response = await Exams.update(data, {where: {id: id}})
        return response
    }

    async getById(id){
        const response = await Exams.findByPk(id)
        return response
    }
}

export default new ExamsRepository();