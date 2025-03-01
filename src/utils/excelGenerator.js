import ExcelJS from "exceljs";
import Empresa from "../companies/empresa.model.js";
import path from "path";

export const generateExcelFile = async () => {
  try {
    const empresas = await Empresa.find({});
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Empresas");

    // Definir las columnas del Excel
    worksheet.columns = [
      { header: "Nombre", key: "nombre", width: 30 },
      { header: "Impacto", key: "impacto", width: 15 },
      { header: "Trayectoria", key: "trayectoria", width: 15 },
      { header: "Categoría", key: "categoria", width: 30 },
      { header: "Descripción", key: "descripcion", width: 100 },
    ];

    // Agregamos cada empresa como una fila
    empresas.forEach((empresa) => {
      worksheet.addRow({
        nombre: empresa.name,
        impacto: empresa.impact,
        trayectoria: empresa.trajectory,
        categoria: empresa.category,
        descripcion: empresa.additionalInfo || ""
      });
    });

    // Guardar el archivo Excel en la raíz del proyecto
    const filePath = path.join(process.cwd(), "Empresas.xlsx");
    await workbook.xlsx.writeFile(filePath);
    console.log("✅ Excel actualizado en", filePath);
    return filePath;
  } catch (err) {
    console.error("❌ Error al generar el Excel:", err);
    throw err;
  }
};

export const getExcelFilePath = () => {
  return path.join(process.cwd(), "Empresas.xlsx");
};
