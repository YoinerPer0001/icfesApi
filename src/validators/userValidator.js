import { validationResult , body} from "express-validator";

export const loginValidator = [
    body("email")
    .notEmpty().withMessage("this value can't be empty")
    .isEmail().withMessage("this value must be valid email"),
    body("password")
    .notEmpty().withMessage("this value can't be empty")
    .isLength({min: 8}).withMessage("the value must have minimun 8 characters"),

    (req, res, next)=>{
        const errorList = validationResult(req)

        if(!errorList.isEmpty()){
            return res.status(400).json(errorList.array())
        }

        next()
    }
]

export const registerValidator = [

    body("name")
    .notEmpty().withMessage("this value can't be empty")
    .isString().withMessage("this value must be a String"),

    body("last_name")
    .notEmpty().withMessage("this value can't be empty")
    .isString().withMessage("this value must be a String"),

    body("email")
    .notEmpty().withMessage("this value can't be empty")
    .isEmail().withMessage("this value must be valid email"),
    body("password")
    .notEmpty().withMessage("this value can't be empty")
    .isLength().withMessage("the value must have minimun 8 characters"),

    (req, res, next)=>{
        const errorList = validationResult(req)

        if(!errorList.isEmpty()){
            return res.status(400).json(errorList.array())
        }

        next()
    }
]

export const UpdateValidator = [

    body("name").optional()
    .notEmpty().withMessage("this value can't be empty")
    .isString().withMessage("this value must be a String"),

    body("last_name").optional()
    .notEmpty().withMessage("this value can't be empty")
    .isString().withMessage("this value must be a String"),

    body("email").optional()
    .notEmpty().withMessage("this value can't be empty")
    .isEmail().withMessage("this value must be valid email"),
    
    body("password").optional()
    .notEmpty().withMessage("this value can't be empty")
    .isLength({min: 8}).withMessage("the value must have minimun 8 characters"),

    (req, res, next)=>{
        const errorList = validationResult(req)

        if(!errorList.isEmpty()){
            return res.status(400).json(errorList.array())
        }

        next()
    }
]

export const TokenValidator = [
    body("refreshToken")
    .notEmpty().withMessage("this value can't be empty")
    .custom(async value => {
        if(!value.startsWith("Bearer ")){
            throw new Error("no valid Token");
        }
    }),

    (req, res, next)=>{
        const errorList = validationResult(req)

        if(!errorList.isEmpty()){
            return res.status(403).json(errorList.array())
        }

        next()
    }
]