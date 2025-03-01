//Validar datos relacionados a la BD
import Empresa from "../companies/empresa.model.js";

export const existCompanyName = async (name) => {
  const alreadyExists = await Empresa.findOne({ name });
  if (alreadyExists) {
    console.error(`La empresa con nombre ${name} ya está registrada`);
    throw new Error(`La empresa con nombre ${name} ya está registrada`);
  }
};
