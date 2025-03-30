import express from "express"
import questionController from "../controller/questionController.js"
import { validateQuestion } from "../validators/questionValidator.js"


const QuestionRoutes = express.Router()


QuestionRoutes.post("/question/create",validateQuestion, questionController.createQuestion)


export default QuestionRoutes