import { check } from "express-validator";

export const signupValidation = [
    check('name', 'Name length should be 10 to 20 characters')
                    .isLength({ min: 10, max: 20 }),
    check('phoneNo', 'Mobile number should contains 10 digits')
                    .isLength({ min: 10, max: 10 }),
    check('password', 'Password length should be 8 to 10 characters')
                    .isLength({ min: 8, max: 10 })
]

export const signinValidation = [
    check('name', 'Name length should be 10 to 20 characters')
                    .isLength({ min: 10, max: 20 }),
    check('password', 'Password length should be 8 to 10 characters')
                    .isLength({ min: 8, max: 10 })
]
