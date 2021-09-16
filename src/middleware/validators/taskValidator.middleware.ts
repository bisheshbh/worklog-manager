import { body } from "express-validator";

export let createTaskValidation = [
    body('task_description')
    .not().isEmpty()
    .withMessage("Task description is required")
];