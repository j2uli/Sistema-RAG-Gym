const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    apellido: {
        type: String,
        required: true
    },

    correo: {
        type: String,
        required: true,
        unique: true
    },

    password: {
    type: String,
    required: true,
    select: false
    },

    rol: {
        type: String,
        default: "usuario"
    },

    fecha_registro: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Usuario", usuarioSchema);