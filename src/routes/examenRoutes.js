import express from "express"
import {CourseIdValidator, UpdateValidator } from "../validators/examValidator.js";
import {verifyAccessToken, VerifyRefreshToken} from "../middlewares/verifyToken.js"
import examsController from "../controller/examsController.js";
import { IdValidator } from "../validators/general/generalValidators.js";

const ExamenRoutes = express.Router()

ExamenRoutes.get("/exam/:id", verifyAccessToken, IdValidator, examsController.getById)

ExamenRoutes.get("/exams/user/all", verifyAccessToken, examsController.getAllUser)

ExamenRoutes.post("/exam/create", verifyAccessToken, CourseIdValidator , examsController.create) // create exam

ExamenRoutes.put("/exam/update/:id", verifyAccessToken,IdValidator, UpdateValidator, examsController.update)


export default ExamenRoutes