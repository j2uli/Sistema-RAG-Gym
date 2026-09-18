const mongoose = require("mongoose");


const historialProgresoSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    peso: {
        type: Number
    },

    altura: {
        type: Number
    },

    grasa_corporal: {
        type: Number
    },

    medidas: {
        type: String
    },

    rendimiento: {
        type: String
    },

    observaciones: {
        type: String
    },

    fecha_registro: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model(
    "HistorialProgreso",
    historialProgresoSchema
);