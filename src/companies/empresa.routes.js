import { Router } from "express";
import { createCompany, getCompanies, updateCompany } from "./empresa.controller.js";
import { validateJWT } from "../../middlewares/validate.jwt.js";
import { companyValidator } from "../../middlewares/validators.js";

const api = Router();

api.post("/create", validateJWT, companyValidator, createCompany);
api.get("/list", validateJWT, getCompanies);
api.put("/update/:id", validateJWT, companyValidator, updateCompany);
api.get("/excel", validateJWT);

export default api;