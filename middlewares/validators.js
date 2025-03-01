// Validar datos de empresas en las rutas
import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js";
import { existCompanyName } from "../src/utils/db.validators.js";

export const loginValidator = [
  body('userLoggin', 'Username or email cannot be empty')
      .notEmpty()
      .toLowerCase(),    
  body('password', 'Password cannot be empty and needs to be Strong')
      .notEmpty()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
      .withMessage('The password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.')
]

// Crear validaciones para registro de empresas
export const companyValidator = [
  body("name", "El nombre de la empresa no puede estar vacío").notEmpty(),

  body("name").custom(existCompanyName),

  body("impact", "El impacto no puede estar vacío").notEmpty(),

  body("trajectory", "La trayectoria debe ser un número").isNumeric(),

  body("category", "La categoría es obligatoria").notEmpty(),

  validateErrors,
];

