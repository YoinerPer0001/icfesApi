import AnswerOptions from "../model/answersOptionsModel.js";
import db from "../core/db.js";
class AnswerOptionRepository {
    async getById(id){
        const response = await AnswerOptions.findByPk(id);
        return response
    }

    async create(data, transaction){
       
        let dbTransaction;

        if(transaction != null){
            dbTransaction = transaction
        }else{
            console.log("nulo transaction")
            dbTransaction = await db.transaction()
        }
        const response = await AnswerOptions.create(data, {transaction: dbTransaction});
        
        return {response, dbTransaction}
    }
}

export default new AnswerOptionRepository();