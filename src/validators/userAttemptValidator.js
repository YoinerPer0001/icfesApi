import { validationResult, body, param } from "express-validator";

export const CreateAttemptValidator = [
    body("exam_id")
    .isUUID().withMessage("value format is not valid")
    .notEmpty().withMessage("value can't be empty"),
    body("data")
    .notEmpty().withMessage("value can't be empty")
    .isArray().withMessage("value must be a array")
    .custom(async (value)=> {

       value.forEach(element => {
        if(!element.question_id || typeof element.question_id !== "string"){
            throw new Error("data.question_id can't be empty and must be a string");
        }

        if (element.answer_id !== null && typeof element.answer_id !== "string") {
            throw new Error("data.answer_id must be a string or null");
        }
       });
    }),

    (req, res, next)=>{
        const errorList = validationResult(req)

        if(!errorList.isEmpty()){
            return res.status(400).json(errorList.array())
        }

        next()
    }
]