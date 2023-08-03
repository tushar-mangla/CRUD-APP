import { body } from "express-validator";

export const validateDate = (fieldName) => {
  return body(fieldName)
    .notEmpty()
    .withMessage(`${fieldName} is required`)
    .custom((value) => {
      const date = new Date(value);
      if (isNaN(date)) {
        throw new Error(`Invalid ${fieldName} format`);
      }
      const currentDate = new Date();
      if (date > currentDate) {
        throw new Error(`${fieldName} cannot be in the future`);
      }
      return true;
    });
};
