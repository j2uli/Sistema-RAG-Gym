const mongoose = require("mongoose");

const sesionSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    rutina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rutina",
        required: true
    },

    fecha: {
        type: Date,
        default: Date.now
    },

    duracion: {
        type: Number
    },

    estado: {
        type: String,
        default: "Completada"
    },

    observaciones: {
        type: String
    }

});


module.exports = mongoose.model(
    "SesionEntrenamiento",
    sesionSchema
);