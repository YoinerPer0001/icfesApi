import userService from "../services/userService.js";

class UserController {
  async register(req, res) {
    try {
      const response = await userService.registerService(req.body);
      return res.status(response.code).json(response.response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const response = await userService.login(email, password);

      return res.status(response.code).json(response.response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.user.data;

      const response = await userService.update(id, req.body);

      return res.status(response.code).json(response.response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async SendEmailPasswordRecover(req, res) {
    try {
      const { email } = req.params;

      const response = await userService.recoverPassword(email);

      return res.status(response.code).json(response.response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

export default new UserController();
