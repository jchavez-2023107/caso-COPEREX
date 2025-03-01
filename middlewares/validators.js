// Validar datos de empresas en las rutas
import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js";

export const loginValidator = [
  body('userLoggin', 'Username or email cannot be empty')
      .notEmpty()
      .toLowerCase(),    
  body('password', 'Password cannot be empty')
      .notEmpty()
      .isLength({ min: 8 })  
      .withMessage('The password must be at least 8 characters long')
]

// Crear validaciones para registro de empresas
export const companyValidator = [
  body("name", "El nombre de la empresa no puede estar vacío").notEmpty(),

  body("impact", "El impacto no puede estar vacío").notEmpty(),

  body("trajectory", "La trayectoria debe ser un número").isNumeric(),

  body("category", "La categoría es obligatoria").notEmpty(),

  validateErrors,
];
