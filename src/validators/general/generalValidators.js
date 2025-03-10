import { validationResult , body, param} from "express-validator";


export const EmailValidator = [
    param('email')
    .notEmpty().withMessage("this value can't be empty")
    .isEmail().withMessage("this value must be valid email"),

    (req, res, next)=>{
        const errorList = validationResult(req)

        if(!errorList.isEmpty()){
            return res.status(400).json(errorList.array())
        }

        next()
    }
]


export const IdValidator = [
    param('id')
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