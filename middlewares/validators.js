// Validar datos de empresas en las rutas
import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js";

// Crear validaciones para registro de empresas
export const companyValidator = [
  body("name", "El nombre de la empresa no puede estar vacío").notEmpty(),

  body("impact", "El impacto debe ser un número").isNumeric(),

  body("trajectory", "La trayectoria debe ser un número").isNumeric(),

  body("category", "La categoría es obligatoria").notEmpty(),

  validateErrors,
];
