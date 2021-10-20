import { body } from "express-validator";

export let createFeedbackValidation = [
    body('comment')
    .not().isEmpty()
    .withMessage("Comment is required")
];