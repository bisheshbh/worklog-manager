import {body} from 'express-validator';

export let createUserValidation = [
    body('username')
        .not().isEmpty()
        .withMessage("Username is required"),
    body('email')
        .not().isEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Must be a valid email"),
    body('password')
        .not().isEmpty()
        .withMessage("Password is required")
        .isLength({min:8})
        .withMessage("Password must be atleast 8 characters long"),
    body('date_of_birth')
        .not().isEmpty()
        .withMessage("Date of birth is required"),
    body('address')
        .not().isEmpty()
        .withMessage("Address is required"),
    body('department')
        .not().isEmpty()
        .withMessage('Department is required')
]

export let loginUserValidation = [
    body('email')
        .not().isEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),
    body('password')
        .not().isEmpty()
        .withMessage('Password is required')
    
]


