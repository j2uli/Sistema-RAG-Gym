const mongoose = require("mongoose");


const usuarioSchema = new mongoose.Schema({


    nombre:{
        type:String,
        required:true
    },


    apellido:{
        type:String,
        required:true
    },


    correo:{
        type:String,
        unique:true,
        required:true
    },


    password:{
        type:String,
        required:true
    },


    rol:{
        type:String,
        default:"usuario"
    },



    membresia:{


        estado:{

            type:String,

            default:"Activo"

        },


        plan:{


            type:String,

            default:"Mensual"

        },



        fecha_inicio:{


            type:Date,

            default:Date.now

        },



        fecha_fin:{


            type:Date

        }


    },



    fecha_registro:{

        type:Date,

        default:Date.now

    }



});



module.exports = mongoose.model(
    "Usuario",
    usuarioSchema
);