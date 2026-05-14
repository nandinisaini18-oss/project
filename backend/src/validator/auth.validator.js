import {body , validationResult} from "express-validator"

function validate(req , res , next){
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({message : errors.array()})
    }

    next()
}

// fullname , email , password , contact , bio , age , gender , location , profilePicture , role , preferences

export const registerValidation = [
    body("fullname")
    .trim()
    .notEmpty().withMessage("fullname can't be empty")
    .isLength({min : 4}).withMessage("fullname must be 4 characters long"),

    body("email")
    .trim()
    .notEmpty().withMessage("email can't be empty")
    .isEmail().withMessage("email must be a valid email"),

    body("password")
    .trim()
    .notEmpty().withMessage("password can't be empty")
    .isLength({min : 6}).withMessage("password must be 6 characters long"),

    body("contact")
    .matches(/^\d{10}$/).withMessage("conatct must be a valid 10 digit contact"),

    body("bio")
    .trim()
    .notEmpty().withMessage("bio can't be empty")
    .isLength({ max : 300 }).withMessage("bio can't exceed 300 characters"),


    body("age")
    .isInt({ min : 18, max : 100 })
    .withMessage("age must be between 18 and 100"),


    body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("invalid gender"),

    validate
]

export const loginValidation = [
    body("email")
    .trim()
    .notEmpty().withMessage("email can't be empty")
    .isEmail().withMessage("email must be a valid email"),

    body("password")
    .trim()
    .notEmpty().withMessage("password can't be empty")
    .isLength({min : 6}).withMessage("password must be 6 characters long"),

    validate
]