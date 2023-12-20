import { body, param } from "express-validator";

import validationMiddleware from "../middlewares/validator.middleware.js";

export const createTaskValidator = [
    body("title")
        .isString()
        .withMessage("title is required")
        .isLength({ min: 6 })
        .withMessage("title must be at least 6 characters long"),
    body("description")
        .isString()
        .withMessage("description is required"),
    validationMiddleware
];

export const updateTaskValidator = [
    param("id")
        .isString(),
    body("title")
        .optional()
        .isString()
        .isLength({ min: 6 })
        .withMessage("title must be at least 6 characters long"),
    body("description")
        .optional()
        .isString()
        .withMessage("please enter description"),
    validationMiddleware
];

export const deleteTaskValidator = [
    param("id")
        .isString(),
    validationMiddleware
];