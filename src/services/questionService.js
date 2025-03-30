import questionRepository from "../repository/questionRepository.js";
import contextService from "./contextService.js";
import answerOptionsService from "./asnwerOptionsService.js";

class QuestionService {
  async create(info) {


    let dbTransaction;
    let contextData;

    //first create context if user sended
  
    if (info.context) {
      const context = await contextService.create(info.context);

      if (context.code != 200) {
        context.response.ContextDbTransaction.rollback();
        return { code: context.code, response: context.response };
      }
      contextData = context.response.response;
      dbTransaction = context.response.ContextDbTransaction;
    }

    try {

      for (const data of info.data) {

        //second create question
        const question = await questionRepository.create(
          {
            text: data.question.text,
            cat_id: data.question.course,
            context_id: contextData ? contextData.id || null : null,
          },
          dbTransaction
        );

        dbTransaction = question.dbTransaction;

        if (!question.response) {
          dbTransaction.rollback();
          return { code: 500, response: "error to create question" };
        }

        //tird create answers
        for (const answer of data.answers) {
          const answerData = {
            text: answer.text,
            is_correct: answer.is_correct,
            id_question: question.response.dataValues.id,
            type: answer.type
          };
          const answerReponse = await answerOptionsService.create(
            answerData,
            dbTransaction
          );

          if (answerReponse.code != 200) {
            dbTransaction.rollback();
            return { code: 500, response: "error to create answer" };
          }

          dbTransaction = answerReponse.response.dbTransaction;
        
        }

      }

      dbTransaction.commit();

      return { code: 200, response: "" };

    } catch (error) {
      if (dbTransaction) dbTransaction.rollback();

      return { code: 500, response: error.message };
    }

  }

  async getById(id) {
    const response = await questionRepository.getById(id);

    if (!response) return { code: 404, response: "" };

    return { code: 200, response: response };
  }

  async getQuestionForExam(number, course) {
    const response = await questionRepository.getQuestionForExam(
      number,
      course
    );
    if (!response) return { code: 404, response: "" };

    return { code: 200, response: response };
  }
}

export default new QuestionService();
