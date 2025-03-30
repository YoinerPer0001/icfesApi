import { validationResult, checkSchema, body, param } from "express-validator";

export const validateQuestion = [
  body("data").isArray({ min: 1 }).withMessage("data must be a non-empty array"),

  body("data.*.question.text")
    .notEmpty()
    .withMessage("the attribute question.text is required")
    .isString()
    .withMessage("the attribute question.text must be a string"),

  body("data.*.question.course")
    .notEmpty()
    .withMessage("the attribute question.course is required")
    .isUUID()
    .withMessage("the attribute question.course must be a valid UUID"),

  body("data.*.answers")
    .isArray({ min: 1 })
    .withMessage("the attribute answers must be an array with at least one answer"),

  body("data.*.answers.*.text")
    .notEmpty()
    .withMessage("Every answer must have text")
    .isString()
    .withMessage("the answer text must be a string"),

  body("data.*.answers.*.type")
    .notEmpty()
    .withMessage("Every answer must have a type")
    .isString()
    .withMessage("the answer type must be a string"),

  body("data.*.answers.*.is_correct")
    .isBoolean()
    .withMessage("the attribute is_correct must be a boolean"),

  body("context").optional().custom((value) => {
    if (value !== null && typeof value !== "object") {
      throw new Error("context must be an object or null");
    }
    return true;
  }),

  body("context.pre_text")
    .optional()
    .isString()
    .withMessage("the attribute context.pre_text must be a string"),

  body("context.text")
    .optional()
    .notEmpty()
    .withMessage("the attribute context.text is required if provided")
    .isString()
    .withMessage("the attribute context.text must be a string"),

  body("context.type")
    .optional()
    .notEmpty()
    .withMessage("the attribute context.type is required if provided")
    .isString()
    .withMessage("the attribute context.type must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    next();
  },
];

