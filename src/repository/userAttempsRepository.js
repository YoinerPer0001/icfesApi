import UserAttempts from "../model/userAttemptsModel.js";
import db from "../core/db.js";
import Questions from "../model/questionModel.js";
import AnswerOptions from "../model/answersOptionsModel.js";
import Categories from "../model/categoryModel.js";
import Context from "../model/contextModel.js";

class UserAttempsRepository {
  async create(data) {
    const response = await UserAttempts.create(data);

    return { response };
  }

  async getById(id) {
    const response = await UserAttempts.findAll({
      where: { exam_id: id },
      attributes: { exclude: ["createdAt", "updatedAt", "id", "exam_id","question_id" , "answer_id"]},
      include: [
        {
          model: Questions,
          as: "question",
          attributes: { exclude: ["createdAt", "updatedAt", "cat_id",  "context_id"]}, include: [
            {model: Context, as: "context", attributes: {exclude:["createdAt", "updatedAt"]}},
            {model: AnswerOptions, as : "answers", attributes: {exclude:["createdAt", "updatedAt", "id_question"]}
          }],
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

  async verifyExist(id_exam, id_question) {
    const response = await UserAttempts.findOne({
      where: {
        exam_id: id_exam,
        question_id: id_question
      },
    });
    console.log(response)
    return response;
  }
}

export default new UserAttempsRepository();
