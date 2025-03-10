import express from "express";
import { loginValidator, registerValidator, UpdateValidator } from "../validators/userValidator.js";
import { EmailValidator, IdValidator } from "../validators/general/generalValidators.js";
import userController from "../controller/userController.js";
import tokensController from "../controller/tokensController.js";
import {verifyAccessToken, VerifyRefreshToken} from "../middlewares/verifyToken.js"
import { TokenValidator } from "../validators/userValidator.js";

const UserRoutes = express.Router()


// UserRoutes.get('/user/:id', IdValidator)

UserRoutes.post('/user/login',loginValidator, userController.login)

UserRoutes.get('/user/password/recover/:email', EmailValidator)

UserRoutes.post('/user/register', registerValidator, userController.register)

UserRoutes.put('/user/update/:id', UpdateValidator)

UserRoutes.delete('/user/delete/:id', IdValidator)


//tokens

UserRoutes.post("/user/renovate/access",TokenValidator, VerifyRefreshToken, tokensController.renovateAccess)

export default UserRoutes;