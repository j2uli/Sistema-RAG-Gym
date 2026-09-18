const mongoose = require("mongoose");

const maquinaSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    tipo: {
        type: String,
        required: true
    },

    grupo_muscular: {
        type: String,
        required: true
    },

    descripcion: {
        type: String
    },

    estado: {
        type: String,
        default: "Disponible"
    },

    alternativas: {
        type: String
    },

    fecha_registro: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model(
    "Maquina",
    maquinaSchema
);