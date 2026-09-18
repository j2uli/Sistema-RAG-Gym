const mongoose = require("mongoose");

const objetivoSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    objetivo: {
        type: String,
        required: true
    },

    descripcion: {
        type: String
    },

    fecha_registro: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model(
    "ObjetivoEntrenamiento",
    objetivoSchema
);