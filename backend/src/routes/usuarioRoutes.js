const express = require("express");
const router = express.Router();

const Usuario = require("../models/Usuario");


// =====================================
// OBTENER PERFIL PROPIO
// =====================================

router.get("/:id", async(req,res)=>{


    try{


        const usuario = await Usuario.findById(

            req.params.id

        )
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






// =====================================
// ACTUALIZAR PERFIL PROPIO
// =====================================

router.put("/:id", async(req,res)=>{


    try{


        const usuarioActualizado =

        await Usuario.findByIdAndUpdate(


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

            mensaje:"Perfil actualizado correctamente",

            usuario:usuarioActualizado

        });





    }catch(error){


        res.status(500).json({

            mensaje:"Error al actualizar perfil",

            error:error.message

        });


    }


});





module.exports = router;