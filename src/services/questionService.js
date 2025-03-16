import questionRepository from "../repository/questionRepository.js";

class QuestionService {
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
