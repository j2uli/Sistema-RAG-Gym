const mongoose = require("mongoose");

const detalleRutinaSchema = new mongoose.Schema({

    rutina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rutina",
        required: true
    },

    ejercicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ejercicio",
        required: true
    },

    dia: {
        type: String,
        required: true
    },

    series: {
        type: Number,
        required: true
    },

    repeticiones: {
        type: Number,
        required: true
    },

    peso: {
        type: Number
    },

    descanso: {
        type: Number
    },

    orden: {
        type: Number
    }

});


module.exports = mongoose.model(
    "DetalleRutina",
    detalleRutinaSchema
);