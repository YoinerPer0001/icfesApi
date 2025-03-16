import { validationResult , param, body} from "express-validator";

export const CourseIdValidator = [
    body('course_id')
    .notEmpty().withMessage("this value can't be empty")
    .isUUID().withMessage("the value must be UUID type"),

    (req, res, next)=>{
        const errorList = validationResult(req)

        if(!errorList.isEmpty()){
            return res.status(400).json(errorList.array())
        }

        next()
    }
]

export const UpdateValidator = [
    body("duration").optional()
    .isInt().withMessage("the value must be an integer"),
    body("state").optional()
    .custom(async (value) => {
        if(value != "in progress" && value != "finished" && value != "created" ){
            throw new Error("The value es incorrect");
        }
    }).withMessage("must be a value definided"),

    (req, res, next)=>{
        const errorList = validationResult(req)

        if(!errorList.isEmpty()){
            return res.status(400).json(errorList.array())
        }

        next()
    }
]