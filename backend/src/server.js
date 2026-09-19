const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database");
const usuarioRoutes = require("./routes/usuarioRoutes");
const perfilFisicoRoutes = require("./routes/perfilFisicoRoutes");
const objetivoRoutes = require("./routes/objetivoRoutes");
const preferenciaRoutes = require("./routes/preferenciaRoutes");
const ejercicioRoutes = require("./routes/ejercicioRoutes");
const maquinaRoutes = require("./routes/maquinaRoutes");
const ejercicioMaquinaRoutes = require("./routes/ejercicioMaquinaRoutes");
const rutinaRoutes = require("./routes/rutinaRoutes");
const detalleRutinaRoutes = require("./routes/detalleRutinaRoutes");
const sesionEntrenamientoRoutes = require("./routes/sesionEntrenamientoRoutes");
const historialProgresoRoutes = require("./routes/historialProgresoRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/perfil-fisico", perfilFisicoRoutes);
app.use("/api/objetivos", objetivoRoutes);
app.use("/api/preferencias", preferenciaRoutes);
app.use("/api/ejercicios", ejercicioRoutes);
app.use("/api/maquinas", maquinaRoutes);
app.use("/api/ejercicio-maquina", ejercicioMaquinaRoutes);
app.use("/api/rutinas", rutinaRoutes);
app.use("/api/detalle-rutina", detalleRutinaRoutes);
app.use("/api/sesiones", sesionEntrenamientoRoutes);
app.use("/api/historial-progreso", historialProgresoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        message: "Sistema RAG Gym Backend funcionando correctamente"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});