const express = require("express");
const router = express.Router();

const Usuario = require("../models/Usuario");

const verificarToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const bcrypt = require("bcrypt");


// Protección de todas las rutas admin

router.use(
    verificarToken,
    adminMiddleware
);



// =======================
// TEST ADMIN
// =======================

router.get("/test",(req,res)=>{


    res.json({

        mensaje:"Eres administrador",

        usuario:req.usuario

    });


});




// =======================
// LISTAR USUARIOS
// =======================

router.get("/usuarios", async(req,res)=>{


    try{


        const usuarios = await Usuario.find()

        .select("-password");



        res.json(usuarios);



    }catch(error){


        res.status(500).json({

            mensaje:"Error al obtener usuarios",

            error:error.message

        });


    }


});





// =======================
// CREAR USUARIO
// =======================

router.post("/usuarios", async(req,res)=>{


    try{


        const {

            nombre,

            apellido,

            correo,

            password,

            rol


        } = req.body;




        const usuarioExiste = await Usuario.findOne({

            correo

        });



        if(usuarioExiste){


            return res.status(400).json({

                mensaje:"El correo ya está registrado"

            });


        }






        const passwordHash = await bcrypt.hash(

            password,

            10

        );






        const nuevoUsuario = new Usuario({


            nombre,


            apellido,


            correo,


            password:passwordHash,


            rol


        });






        await nuevoUsuario.save();






        res.status(201).json({


            mensaje:"Usuario creado correctamente",


            usuario:{


                nombre:nuevoUsuario.nombre,

                apellido:nuevoUsuario.apellido,

                correo:nuevoUsuario.correo,

                rol:nuevoUsuario.rol


            }


        });





    }catch(error){



        res.status(500).json({


            mensaje:"Error al crear usuario",


            error:error.message


        });



    }


});

// =======================
// EDITAR USUARIO
// =======================

router.put("/usuarios/:id", async(req,res)=>{


    try{


        const usuarioActualizado = await Usuario.findByIdAndUpdate(


            req.params.id,


            req.body,


            {

                new:true

            }


        )
        .select("-password");




        if(!usuarioActualizado){


            return res.status(404).json({

                mensaje:"Usuario no encontrado"

            });


        }





        res.json({


            mensaje:"Usuario actualizado correctamente",


            usuario:usuarioActualizado


        });





    }catch(error){


        res.status(500).json({


            mensaje:"Error al actualizar usuario",


            error:error.message


        });



    }


});



// =======================
// ELIMINAR USUARIO
// =======================

router.delete("/usuarios/:id", async(req,res)=>{


    try{


        const usuarioEliminado = await Usuario.findByIdAndDelete(

            req.params.id

        );



        if(!usuarioEliminado){


            return res.status(404).json({

                mensaje:"Usuario no encontrado"

            });


        }




        res.json({

            mensaje:"Usuario eliminado correctamente"

        });



    }catch(error){


        res.status(500).json({

            mensaje:"Error al eliminar usuario",

            error:error.message

        });



    }


});

// =======================
// OBTENER USUARIO POR ID
// =======================

router.get("/usuarios/:id", async(req,res)=>{

    try{

        const usuario = await Usuario.findById(req.params.id)
        .select("-password");


        if(!usuario){

            return res.status(404).json({
                mensaje:"Usuario no encontrado"
            });

        }


        res.json(usuario);


    }catch(error){

        res.status(500).json({

            mensaje:"Error al obtener usuario",

            error:error.message

        });

    }

});

// =======================
// ACTUALIZAR MEMBRESÍA
// =======================

router.put("/usuarios/:id/membresia", async(req,res)=>{


    try{


        const usuario = await Usuario.findByIdAndUpdate(


            req.params.id,


            {

                membresia:req.body

            },


            {

                new:true

            }


        )
        .select("-password");




        if(!usuario){


            return res.status(404).json({

                mensaje:"Usuario no encontrado"

            });


        }





        res.json({

            mensaje:"Membresía actualizada correctamente",

            usuario

        });





    }catch(error){


        res.status(500).json({

            mensaje:"Error al actualizar membresía",

            error:error.message

        });


    }


});

module.exports = router;

