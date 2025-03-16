import express from "express"
import { IdValidator } from "../validators/general/generalValidators.js"
import examsQuestionsController from "../controller/examsQuestionsController.js"
import {verifyAccessToken, VerifyRefreshToken} from "../middlewares/verifyToken.js"

const ExamQuestionRoutes = express.Router()

ExamQuestionRoutes.get("/exam/data/:id", verifyAccessToken, IdValidator, examsQuestionsController.getExamData) // get all exams' data

export default ExamQuestionRoutes