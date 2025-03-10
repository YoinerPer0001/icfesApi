import UserRepository from "../repository/userRepository.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import authService from './tokensService.js'


class UserService {
  async registerService(user) {
    // Verificar si el usuario ya existe
    const exist = await UserRepository.getxEmail(user.email.toLowerCase());

    if (!exist) {
      // Encriptar contraseña
      const newPass = await bcrypt.hash(user.password, 10);

      // Crear datos del usuario
      const userData = {
        name: user.name.toLowerCase(),
        last_name: user.last_name.toLowerCase(),
        password: newPass,
        email: user.email.toLowerCase(),
      };

      // Guardar en la base de datos
      const response = await UserRepository.create(userData);

      if (!response) {
        throw new Error("Service: Error to create");
      }

      return { code: 200, response };

    }else{
    
        return { code: 409, response: "User is already registered" };
    }
    
  }

  async login(email, password){
    
    const user = await UserRepository.getxEmail(email)

    if(!user){
      return {code: 404, response: ""}
    }

    const isTruePassword = await bcrypt.compare(password, user.password)

    if(!isTruePassword){
      return {code: 401, response: ""}
    }

    const userData = {
      name: user.name.toLowerCase(),
      last_name: user.last_name.toLowerCase(),
      email: user.email.toLowerCase(),
      rol: user.rol_id
    };

    const refreshToken = await authService.generateRefreshToken(userData)
    const accessToken = await authService.generateAccessToken(userData)

    const tokens = {
      refreshToken,
      accessToken
    }

    return {code: 200, response: tokens}

  }

  
}

export default new UserService();
