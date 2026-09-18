const mongoose = require("mongoose");

const preferenciaSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    tipo_preferencia: {
        type: String,
        required: true
    },

    valor: {
        type: String,
        required: true
    },

    fecha_registro: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model(
    "PreferenciaUsuario",
    preferenciaSchema
);