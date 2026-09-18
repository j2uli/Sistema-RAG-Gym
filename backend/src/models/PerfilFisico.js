const mongoose = require("mongoose");

const perfilFisicoSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    peso: {
        type: Number,
        required: true
    },

    altura: {
        type: Number,
        required: true
    },

    imc: {
        type: Number
    },

    nivel_experiencia: {
        type: String,
        required: true
    },

    lesiones: {
        type: String,
        default: "Ninguna"
    },

    disponibilidad: {
        type: String
    }

});


module.exports = mongoose.model(
    "PerfilFisico",
    perfilFisicoSchema
);

