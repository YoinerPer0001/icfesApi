import examsService from "./examsService.js";
import questionService from "./questionService.js";
import answerOptionsService from "./asnwerOptionsService.js";
import userAttemptRepository from "../repository/userAttempsRepository.js";
import examQuestionService from "./examQuestionService.js";

class UserAttempsService {
  async create(data, user_id) {
    const examExist = await examsService.getById(data.exam_id);

    if (examExist.code != 200)
      return { code: examExist.code, response: examExist.response };

      try {
        const listAttemps = data.data.map(async (item) => {
          console.log(item)
          const verifyExist = await userAttemptRepository.verifyExist(
            data.exam_id,
            item.question_id
          );

          if (!verifyExist) {
            const question = await questionService.getById(item.question_id);
            let answer = false
            if (item.answer_id != '') {
              answer = await answerOptionsService.getById(item.answer_id);
            }

            if (question.code != 200) {
              throw new Error("bad information sended");
            }

            const newData = {
              exam_id: data.exam_id,
              question_id: item.question_id,
              answer_id: item.answer_id || null,
              is_correct: answer?.response?.dataValues?.is_correct ?? false,
            };

            return await userAttemptRepository.create(newData);
          }
        });

        await Promise.all(listAttemps);

        await examsService.update(data.exam_id, {state: "finished"})

        await examQuestionService.deleteAnswers(data.exam_id)

        //verificamos si tiene mas de 5 examenes
        const examList = await examsService.getExamUser(user_id);
       
        let listYoung = [];
        
        if (examList.response.length > 5) {
            // Ordenar los exámenes por fecha descendente (más recientes primero)
            const sortedExams = examList.response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
            // Tomar solo los 5 más recientes
            listYoung = sortedExams.slice(0, 5);
            
           

           for (const exam of examList.response) {
            const datasen = listYoung.some(val => val.id === exam.id)
            if(!datasen){
             const deleted = await userAttemptRepository.deleteExamQuestions(exam.id)
             if(deleted){
              await examsService.delete(exam.id)
             }
            }
           }
        }

        return { code: 200, response: "" };
      } catch (error) {
        return { code: 500, response: error.message };
      }
  }

  async getById(id) {
    const response = await userAttemptRepository.getById(id)
    if (!response) return { code: 404, response: "not found" }

    return { code: 200, response: response }
  }

  
}

export default new UserAttempsService();
