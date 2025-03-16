import UserRepository from "../repository/userRepository.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import authService from './tokensService.js'
import userRepository from "../repository/userRepository.js";
import { SendTokenEmail } from "../utils/emailsManager/SendTokenEmail.js";
import { nanoid } from "nanoid";
import tokensService from "./tokensService.js";


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
      id: user.id,
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

  async update(id, data){

    if(data.password){
        data.password = await bcrypt.hash(data.password, 10);
    }

    const userRegistered = await userRepository.getById(id)
    if(!userRegistered){
      return {code: 404, response: ""}
    }
    const response = await userRepository.update(id, data)
    return {code: 200, response: response}
  }


  async recoverPassword(email){

    //verify Email 

    const userExist = await userRepository.getxEmail(email);

    if (!userExist){
      return {code: 404, response: ""}
    }

    // generate token and send to email
    const token = nanoid(6)

    //save to db
    const savedInDb = await tokensService.addTokenRecoverPass(token, userExist.id)

    if (!savedInDb) return {code: 500, response: "Error to save"}

    const emailSended = await SendTokenEmail(email, userExist.name, token)

    if(!emailSended) return {code: 500, response: "error to send code"}


    return {code: 200, response: emailSended}

  }


  async getById(id){
    const response = await userRepository.getById(id);
    return {code: 200, response: response}
  }

 

  
}

export default new UserService();
