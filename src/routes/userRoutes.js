import express from "express";
import { loginValidator, registerValidator, UpdateValidator } from "../validators/userValidator.js";
import { EmailValidator, IdValidator, TokenRecoverValidator } from "../validators/general/generalValidators.js";
import userController from "../controller/userController.js";
import TokensController from "../controller/tokensController.js";
import {verifyAccessToken, VerifyRefreshToken} from "../middlewares/verifyToken.js"
import { TokenValidator } from "../validators/userValidator.js";

const UserRoutes = express.Router()


//UserRoutes.get('/user/:id', IdValidator)

//jksafnhjkasd

UserRoutes.post('/user/login',loginValidator, userController.login)

UserRoutes.get("/user/information",verifyAccessToken, userController.getById)

UserRoutes.get('/user/password/recover/', EmailValidator, userController.SendEmailPasswordRecover) // send email code

UserRoutes.get('/user/password/recover/token/verify', TokenRecoverValidator, TokensController.getTokenExp) //recive code an verify

UserRoutes.post('/user/register', registerValidator, userController.register)

UserRoutes.put('/user/update', UpdateValidator, verifyAccessToken, userController.update)



// UserRoutes.delete('/user/delete/:id', IdValidator)


//tokens

UserRoutes.post("/user/renovate/access",TokenValidator, VerifyRefreshToken, TokensController.renovateAccess)

export default UserRoutes;