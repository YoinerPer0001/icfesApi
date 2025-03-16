import Exams from "../model/examsModel.js";
import ExamQuestions from "../model/examsQuestionModel.js";
import Questions from "../model/questionModel.js";
import AnswerOptions from "../model/answersOptionsModel.js";

class ExamQuestionRepository {
  async create(data, dbTransaction) {
    const response = await ExamQuestions.create(data, {
      transaction: dbTransaction,
    });

    return response;
  }

  async update(id, data) {
    const response = await ExamQuestions.update(data, { where: { id: id } });
    return response;
  }

  async getById(id) {
    const response = await ExamQuestions.findAll({
      where: { exam_id: id },
      include: [
        {
          model: Questions,
          as: "question",
          include: [{ model: AnswerOptions, as: "answers" , attributes: {exclude: ["createdAt", "updatedAt", "is_correct", "id_question"] }}],
          attributes: { exclude: ["createdAt", "updatedAt", "cat_id"] },
        },
      ],
      attributes: {exclude : ["createdAt", "updatedAt", "id", "question_id", "exam_id"]}
    });
    return response;
  }
}

export default new ExamQuestionRepository();
