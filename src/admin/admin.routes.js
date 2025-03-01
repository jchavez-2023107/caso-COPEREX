import { Router } from "express";
import { loginAdmin } from "./admin.controller.js";
import { validateJWT } from "../../middlewares/validate.jwt.js";

const api = Router();

api.post("/login", loginAdmin);
// Ruta de prueba protegida (opcional)
api.get("/test", validateJWT, (req, res) => {
  res.json({ message: "Token válido" });
});

export default api;
