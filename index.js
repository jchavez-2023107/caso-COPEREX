"use strict"; // Habilita el modo estricto para mejorar la seguridad y evitar errores comunes

import dotenv from "dotenv";
dotenv.config(); // Cargar variables de entorno desde .env

import { connectDB } from "./configs/mongo.js"; // Conexión a la base de datos
import { agregarAdminsPorDefecto } from "./src/admin/admin.controller.js"; // Crear admins si aún no existen.
import { agregarEmpresasPorDefecto } from "./src/companies/empresa.controller.js"; // Crear empresas en caso de que no existan.
import { initServer } from "./configs/app.js"; // Inicialización del servidor Express

// Iniciar conexión a MongoDB
(async () => {
  try {
    await connectDB(); // Esperar a que la base de datos se conecte antes de levantar el servidor
    await agregarAdminsPorDefecto();
    await agregarEmpresasPorDefecto();
    initServer(); // Inicializar el servidor Express solo si la BD está conectada
  } catch (err) {
    console.error(
      "❌ Error crítico en la inicialización de la aplicación:",
      err
    );
    process.exit(1); // Cerrar la aplicación si hay un error crítico
  }
})();
