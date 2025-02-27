//Validar datos relacionados a la BD
import Company from "../src/companies/company.model.js"; // Ajustar según el modelo de empresas

export const existCompanyName = async (name) => {
  const alreadyExists = await Company.findOne({ name });
  if (alreadyExists) {
    console.error(`La empresa con nombre ${name} ya está registrada`);
    throw new Error(`La empresa con nombre ${name} ya está registrada`);
  }
};