const express = require("express");
const router = express.Router();

const Usuario = require("../models/Usuario");


router.post("/", async (req, res) => {

    try {

        const nuevoUsuario = new Usuario(req.body);

        await nuevoUsuario.save();

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            usuario: nuevoUsuario
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al crear usuario",
            error: error.message
        });

    }

});

// Actualizar membresía del usuario

router.put("/:id/membresia", async(req,res)=>{


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

router.get("/", async(req,res)=>{


    try{


        const {
            buscar,
            rol,
            estado
        } = req.query;



        let filtro = {};




        if(buscar){


            filtro.$or=[


                {
                    nombre:{
                        $regex:buscar,
                        $options:"i"
                    }
                },


                {
                    apellido:{
                        $regex:buscar,
                        $options:"i"
                    }
                },


                {
                    correo:{
                        $regex:buscar,
                        $options:"i"
                    }
                }


            ];


        }




        if(rol){


            filtro.rol = rol;


        }




        if(estado){


            filtro["membresia.estado"] = estado;


        }






        const usuarios = await Usuario.find(filtro)

        .select("-password");




        res.json(usuarios);





    }catch(error){


        res.status(500).json({

            mensaje:"Error al obtener usuarios",

            error:error.message

        });


    }


});

router.get("/:id", async (req, res) => {

    try {

        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.json(usuario);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al buscar usuario",
            error: error.message
        });

    }

});

router.put("/:id", async (req, res) => {

    try {

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            mensaje: "Usuario actualizado correctamente",
            usuario: usuarioActualizado
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al actualizar usuario",
            error: error.message
        });

    }

});

router.delete("/:id", async (req, res) => {

    try {

        await Usuario.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: "Usuario eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al eliminar usuario",
            error: error.message
        });

    }

});