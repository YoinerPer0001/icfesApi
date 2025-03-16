import express from "express"
import userAttemptController from "../controller/userAttemptController.js"
import {verifyAccessToken, VerifyRefreshToken} from "../middlewares/verifyToken.js"
import { EmailValidator, IdValidator } from "../validators/general/generalValidators.js";

const UserAttempsRoutes = express.Router()

UserAttempsRoutes.post("/exam/user/attempt",verifyAccessToken, userAttemptController.createAttemp)

UserAttempsRoutes.get("/exam/attempts/:id", verifyAccessToken, IdValidator, userAttemptController.getByExamId)

export default UserAttempsRoutes