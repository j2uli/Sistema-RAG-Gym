const mongoose = require("mongoose");

const rutinaSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    nombre: {
        type: String,
        required: true
    },

    objetivo: {
        type: String,
        required: true
    },

    frecuencia: {
        type: String,
        required: true
    },

    descripcion: {
        type: String
    },

    estado: {
        type: String,
        default: "Activa"
    },

    fecha_creacion: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model(
    "Rutina",
    rutinaSchema
);