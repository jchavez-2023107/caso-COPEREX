import Empresa from "./empresa.model.js";
import {
  generateExcelFile,
} from "../utils/excelGenerator.js";

export const createCompany = async (req, res) => {
  try {
    const { name, impact, trajectory, category, additionalInfo } = req.body;
    const newCompany = await Empresa.create({
      name,
      impact,
      trajectory,
      category,
      additionalInfo,
    });
    await generateExcelFile();
    return res
      .status(201)
      .json({ message: "Empresa registrada exitosamente", newCompany });
  } catch (err) {
    console.log(err);
    return res
      .send(400)
      .json({ message: "Error al crear empresa", error: err.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const { categoria, trayectoria, orden } = req.query;
    const filtro = {};

    // Buscar
    if (categoria) {
      filtro.category = categoria;
    }
    if (trayectoria) {
      const trajNum = Number(trayectoria);
      if (!isNaN(trajNum)) {
        filtro.trajectory = trajNum;
      }
    }

    let empresasQuery = Empresa.find(filtro);

    // Asignar a sort
    if (orden === "A-Z") {
      empresasQuery = empresasQuery.sort({ name: 1 });
    } else if (orden === "Z-A") {
      empresasQuery = empresasQuery.sort({ name: -1 });
    } else if (orden === "trajectoryAsc") {
      empresasQuery = empresasQuery.sort({ trajectory: 1 });
    } else if (orden === "trajectoryDesc") {
      empresasQuery = empresasQuery.sort({ trajectory: -1 });
    }

    const results = await empresasQuery;
    return res.json({ message: "Empresas encontradas", results });
  } catch (err) {
    console.log(err);
    return res
      .send(500)
      .json({ message: "Error al obetener empresas", error: err.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, impact, trajectory, category, additionalInfo } = req.body;
    const updated = await Empresa.findByIdAndUpdate(
      id,
      { name, impact, trajectory, category, additionalInfo },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Empresa no encontrada" });
    await generateExcelFile(); // Actualiza el Excel al modificar una empresa
    return res.json({
      message: `Su empresa ${id} ha sido actualizada`,
      updated,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Error al actualizar empresa", error: err.message });
  }
};

/* export const generateExcelReport = async (req, res) => {
  try {
    const empresas = await Empresa.find({});
    const wb = new excel.Workbook();
    const ws = wb.addWorksheet("Empresas-Interfer");

    const headers = [
      "Nombre",
      "Impacto",
      "Trayectoria",
      "Categoría",
      "Información Adicional",
    ];
    headers.forEach((header, idx) => {
      ws.cell(1, idx + 1).string(header);
    });

    empresas.forEach((empresa, rowIndex) => {
      ws.cell(rowIndex + 2, 1).string(empresa.name);
      ws.cell(rowIndex + 2, 2).string(empresa.impact);
      ws.cell(rowIndex + 2, 3).string(empresa.trajectory);
      ws.cell(rowIndex + 2, 4).string(empresa.category);
      ws.cell(rowIndex + 2, 5).string(empresa.additionalInfo || "");
    });

    const fileName = `ReporteEmpresas.xlsx`;
    wb.write(fileName, res);

    return res.json({ message: "Su documento Excel ha sido descargado" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error al generar reporte", error: err.message });
  }
}; */

// Descargar el excel en caso de ser requerido enviarlo.
/* export const downloadExcelReport = async (req, res) => {
  try {
    const filePath = getExcelFilePath();
    return res.download(filePath, "ReporteEmpresas.xlsx");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error al descargar el reporte", error: err.message });
  }
}; */

// Agregar empresas por defecto
export const agregarEmpresasPorDefecto = async () => {
  try {
    const empresasExistentes = await Empresa.countDocuments();
    if (empresasExistentes === 0) {
      const empresasPorDefecto = [
        {
          name: "Tech Solutions",
          impact: "Alto",
          trajectory: 10,
          category: "Tecnología",
          additionalInfo: "Empresa líder en innovación",
        },
        {
          name: "Green Foods",
          impact: "Medio",
          trajectory: 5,
          category: "Alimentación",
          additionalInfo: "Especializada en productos orgánicos",
        },
        {
          name: "EduSmart",
          impact: "Bajo",
          trajectory: 3,
          category: "Educación",
          additionalInfo: "Innovación en métodos educativos",
        },
        {
          name: "AutoDrive",
          impact: "Alto",
          trajectory: 8,
          category: "Automotriz",
          additionalInfo: "Vehículos autónomos y eléctricos",
        },
        {
          name: "HealthFirst",
          impact: "Medio",
          trajectory: 7,
          category: "Salud",
          additionalInfo: "Servicios de salud y bienestar",
        },
      ];
      await Empresa.insertMany(empresasPorDefecto);
      console.log("✅ Se crearon las empresas por defecto");
      // Actualizamos el excel al insertar los datos por defecto
      await generateExcelFile();
    } else {
      console.log(
        "ℹ️ Ya existen empresas en la base de datos, no se crearon por defecto"
      );
    }
  } catch (error) {
    console.error("❌ Error al agregar empresas por defecto:", error);
  }
};
