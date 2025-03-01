import adminRoutes from "./admin/admin.routes.js";

/**
 * Función que recibe la app de Express y registra
 * todas las rutas en una sola llamada.
 */
export const rutasGenerales = (app) => {
  app.use("/api/admin", adminRoutes);
  //app.use("/api/", );
};
