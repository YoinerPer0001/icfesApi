import examsService from "../services/examsService.js";

class ExamController {
  async getById(req, res) {
    try {
      const {id} = req.params
      const response = await examsService.getById(id);
      res.status(response.code).json(response.response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { id } = req.user.data;
      const { course_id } = req.body;
      console.log(course_id);
      const response = await examsService.createExam(id, course_id);

      res.status(response.code).json(response.response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const response = await examsService.update(id, req.body);

      res.status(response.code).json(response.response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ExamController();
