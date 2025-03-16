import UserAttempts from "../model/userAttemptsModel.js";
import db from "../core/db.js";
import Questions from "../model/questionModel.js";
import AnswerOptions from "../model/answersOptionsModel.js";

class UserAttempsRepository {
  async create(data) {
    const response = await UserAttempts.create(data);
    console.log(response);
    return { response };
  }

  async getById(id) {
    const response = await UserAttempts.findAll({
      where: { exam_id: id },
      attributes: { exclude: ["createdAt", "updatedAt", "id", "exam_id","question_id" , "answer_id"] },
      include: [
        {
          model: Questions,
          as: "question",
          attributes: { exclude: ["createdAt", "updatedAt", "cat_id"] },
        },
        {
          model: AnswerOptions,
          as: "answer",
          attributes: {exclude: ["createdAt", "updatedAt", "is_correct", "id_question"] }
        }
      ],
    });
    return response;
  }

  async verifyExist(id_exam, id_question, id_answer) {
    const response = await UserAttempts.findOne({
      where: {
        exam_id: id_exam,
        question_id: id_question,
        answer_id: id_answer,
      },
    });
    return response;
  }
}

export default new UserAttempsRepository();
