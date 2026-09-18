const mongoose = require("mongoose");

const ejercicioSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    descripcion: {
        type: String
    },

    grupo_muscular: {
        type: String,
        required: true
    },

    nivel: {
        type: String,
        required: true
    },

    tipo: {
        type: String,
        required: true
    },

    fecha_registro: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model(
    "Ejercicio",
    ejercicioSchema
);