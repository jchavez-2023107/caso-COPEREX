"use strict";

import jwt from "jsonwebtoken";
import Admin from "../src/admin/admin.model.js";

export const validateJWT = async (req, res, next) => {
  try {
    const secretKey = process.env.SECRET_KEY;
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // Extraer el token
    const token = authorization.split(" ")[1];

    // Verificar el token
    const decoded = jwt.verify(token, secretKey);

    // Cargar el usuario de la base de datos para obtener el valor actual de updateAt
    const admin = await Admin.findById(decoded.uid);
    if (!admin) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Admin not found" });
    }

    // Comparar tokenVersion del token con el timestamp actual de updateAt del usuario
    const currentVersion = admin.updatedAt.getTime();
    if (decoded.tokenVersion < currentVersion) {
      return res
        .status(401)
        .json({ message: "Token is outdated, please re-login" });
    }

    // Inyectar en la solicitud del admin autenticado
    req.admin = {
      id: decoded.uid,
      username: decoded.username,
    };

    next();
  } catch (err) {
    console.error("❌ JWT Error:", err);
    return res.status(401).json({ message: "Invalid credentials" });
  }
};
