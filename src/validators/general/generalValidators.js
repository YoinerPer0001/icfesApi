import { validationResult , body, param, query} from "express-validator";


export const EmailValidator = [
    query('email')
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

export const TokenRecoverValidator = [
    query('token')
    .notEmpty().withMessage("this value can't be empty"),

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

export const IdqueryValidator = [
    query('id')
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