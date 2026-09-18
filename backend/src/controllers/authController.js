const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/Usuario");


// ============================
// REGISTRO DE USUARIO
// ============================

const registrarUsuario = async (req, res) => {

    try {

        const {
            nombre,
            apellido,
            correo,
            password,
            rol
        } = req.body;


        // Verificar si existe
        const usuarioExiste = await Usuario.findOne({
            correo
        });


        if (usuarioExiste) {

            return res.status(400).json({
                mensaje: "El correo ya está registrado"
            });

        }


        // Encriptar contraseña
        const passwordEncriptada = await bcrypt.hash(
            password,
            10
        );


        const nuevoUsuario = new Usuario({

            nombre,
            apellido,
            correo,

            password: passwordEncriptada,

            rol

        });


        await nuevoUsuario.save();


        res.status(201).json({

            mensaje: "Usuario registrado correctamente",

            usuario: {
                nombre: nuevoUsuario.nombre,
                apellido: nuevoUsuario.apellido,
                correo: nuevoUsuario.correo,
                rol: nuevoUsuario.rol
            }

        });


    } catch(error) {


        res.status(500).json({

            mensaje: "Error al registrar usuario",
            error: error.message

        });


    }

};




// ============================
// LOGIN
// ============================

const loginUsuario = async (req,res)=>{


    try {


        const {
            correo,
            password
        } = req.body;



        // Buscar usuario incluyendo password
        const usuario = await Usuario
            .findOne({correo})
            .select("+password");



        if(!usuario){

            return res.status(404).json({

                mensaje:"Usuario no encontrado"

            });

        }



        // Comparar contraseña

        const passwordCorrecta =
            await bcrypt.compare(
                password,
                usuario.password
            );



        if(!passwordCorrecta){


            return res.status(401).json({

                mensaje:"Contraseña incorrecta"

            });


        }



        // Crear token

        const token = jwt.sign(

            {
                id: usuario._id,
                rol: usuario.rol
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"1d"
            }

        );



        res.json({

            mensaje:"Login correcto",

            token,

            usuario:{
                id:usuario._id,
                nombre:usuario.nombre,
                rol:usuario.rol
            }

        });



    } catch(error){


        res.status(500).json({

            mensaje:"Error al iniciar sesión",
            error:error.message

        });


    }


};



module.exports = {

    registrarUsuario,
    loginUsuario

};