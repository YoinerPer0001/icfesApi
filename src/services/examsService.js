import categoryService from "../services/categoryService.js";
import examsRepository from "../repository/examsRepository.js";
import questionService from "./questionService.js";
import examQuestionService from "./examQuestionService.js";

class ExamsService {
  async createExam(user, course) {
    //first part

    const categoryExist = await categoryService.getById(course);

    if (categoryExist.code != 200) {
      return { code: 404, response: "course not found" };
    }

    const { num_questions } = categoryExist.response.dataValues;

    const duration = parseInt(num_questions) * 2; //2 mins

    const data = {
      user_id: user,
      duration: duration,
      course_id: course,
    };

    const { response, dbTransaction } = await examsRepository.create(data);

    try {
      //get questions

      const questions = await questionService.getQuestionForExam(
        parseInt(num_questions),
        course
      );

      if (questions.code != 200) {
        dbTransaction.rollback();
        return { code: 500, response: "error to get questions" };
      }

      //add questions to exam
      const QuestionPromises = questions.response.map(async (question) => {

        const resDb = await examQuestionService.create(
          {
            exam_id: response.id,
            question_id: question.id,
          },
          dbTransaction
        );

        if (resDb.code != 200) {
          throw new Error("Error to add questions");
        }
        return resDb.response;
      });

      await Promise.all(QuestionPromises);

      await dbTransaction.commit();

      const UpdateStateExam = await examsRepository.update(response.id, {state: "in progress"})

      if (!UpdateStateExam) {
        dbTransaction.rollback();
        return { code: 500, response: "error to create" };
      }

      

      const examInfo = await examQuestionService.getExamInformation(response.id)

      const data = {
        exam: response,
        questions: examInfo.response
      }
      
      return { code: 200, response: data };
    } catch (error) {
      dbTransaction.rollback();
      return { code: 500, response: error.message };
    }
  }

  async update(id, data){
    const response = await examsRepository.update(id, data)
    if(!response) return {code: 500, response: "error to update"}

    return {code: 200, response: response}
  }

  async getById(id){
    const response = await examsRepository.getById(id)
    if(!response) return {code: 404, response: "error not found"}

    return {code: 200, response: response}
  }

  async getExamUser(id_user){
    const response = await examsRepository.getExamUser(id_user)
    if(!response) return {code: 404, response: "error not found"}

    return {code: 200, response: response}
  }

   async delete(id){
          const response = examsRepository.delete(id)
          if(!response) return {code: 500, response: "error to delete"}
  
          return {code: 200, response: response}
      }

}

export default new ExamsService();
