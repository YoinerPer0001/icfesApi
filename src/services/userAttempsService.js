import examsService from "./examsService.js";
import questionService from "./questionService.js";
import answerOptionsService from "./asnwerOptionsService.js";
import userAttemptRepository from "../repository/userAttempsRepository.js";

class UserAttempsService {
  async create(data) {
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
