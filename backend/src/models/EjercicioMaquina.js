const mongoose = require("mongoose");

const ejercicioMaquinaSchema = new mongoose.Schema({

    ejercicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ejercicio",
        required: true
    },

    maquina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Maquina",
        required: true
    },

    observacion: {
        type: String
    },

    fecha_registro: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model(
    "EjercicioMaquina",
    ejercicioMaquinaSchema
);