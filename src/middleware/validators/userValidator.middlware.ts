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

export let updatePasswordValidation = [
    body('current_password')
        .not().isEmpty()
        .withMessage("Current password is empty"),
    body('new_password')
        .not().isEmpty()
        .withMessage('New password is empty')
]

export let updateUserValidation = [
    body('username')
        .not().isEmpty()
        .withMessage('Username must not be empty'),
    body('email_address')
        .not().isEmpty()
        .withMessage("Email address must not be empty")
]

