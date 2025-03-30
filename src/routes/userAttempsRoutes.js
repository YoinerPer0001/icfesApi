import express from "express"
import userAttemptController from "../controller/userAttemptController.js"
import {verifyAccessToken, VerifyRefreshToken} from "../middlewares/verifyToken.js"
import { EmailValidator, IdqueryValidator, IdValidator } from "../validators/general/generalValidators.js";
import { CreateAttemptValidator } from "../validators/userAttemptValidator.js";

const UserAttempsRoutes = express.Router()

UserAttempsRoutes.post("/exam/user/attempt",verifyAccessToken,CreateAttemptValidator, userAttemptController.createAttemp)

UserAttempsRoutes.get("/exam/user/attempt", verifyAccessToken, IdqueryValidator, userAttemptController.getByExamId)

export default UserAttempsRoutes