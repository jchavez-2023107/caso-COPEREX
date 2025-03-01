import Admin from "./admin.model.js";
import { encrypt, checkPassword } from "../utils/encrypt.js";
import { generateToken } from "../utils/jwt.js";

// Crear admins por defecto si no existen
export const agregarAdminsPorDefecto = async () => {
  try {
    const adminsExistentes = await Admin.countDocuments();
    if (adminsExistentes === 0) {
      const hashedAdminPassword = await encrypt("12345678Aa!");
      const adminsPorDefecto = [
        {
          name: "Marla",
          surname: "Pérez",
          adminname: "mperez",
          email: "mperez@gmail.com",
          password: hashedAdminPassword,
          phone: "55986458",
        },
        {
          name: "Joel",
          surname: "Chávez",
          adminname: "jchavez",
          email: "jchavez-2023107@kinal.edu.gt",
          password: hashedAdminPassword,
          phone: "55986458",
        },
      ];
      await Admin.insertMany(adminsPorDefecto);
      console.log("✅ Se crearon los admins por defecto");
    } else {
      console.log(
        "ℹ️ Ya existen admins en la base de datos, no se crearon admins por defecto"
      );
    }
  } catch (error) {
    console.error("❌ Error al agregar admins por defecto:", error);
  }
};

// Login del Admin
export const loginAdmin = async (req, res) => {
  try {
    const { adminlogin, password } = req.body;
    // Buscar al usuario por adminname o email
    const admin = await Admin.findOne({
      $or: [{ adminname: adminlogin }, { email: adminlogin }],
    }).select("+password");

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verificar contraseña
    const isValid = await checkPassword(admin.password, password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generar token JWT
    const token = await generateToken({
      uid: admin._id,
      adminname: admin.adminname,
      role: admin.role,
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("❌ Error en loginAdmin:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
