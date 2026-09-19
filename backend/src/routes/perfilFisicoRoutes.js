const express = require("express");
const router = express.Router();

const PerfilFisico = require("../models/PerfilFisico");
const verificarToken = require("../middleware/authMiddleware");

// Crear perfil físico
router.post("/", verificarToken, async(req,res)=>{
    try {

        const perfil = new PerfilFisico(req.body);

        await perfil.save();

        res.status(201).json({
            mensaje: "Perfil físico creado correctamente",
            perfil
        });

    } catch(error){

        res.status(500).json({
            mensaje: "Error al crear perfil físico",
            error: error.message
        });

    }

});


// Obtener todos los perfiles
router.get("/", verificarToken, async(req,res)=>{
    try{

        const perfiles = await PerfilFisico.find()
        .populate("usuario");

        res.json(perfiles);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al obtener perfiles",
            error:error.message
        });

    }

});


module.exports = router;

// Obtener perfil físico por usuario
router.get("/usuario/:usuarioId", verificarToken, async(req,res)=>{

    try{


        const perfil = await PerfilFisico.findOne({

            usuario: req.params.usuarioId

        })
        .populate("usuario");



        if(!perfil){

            return res.status(404).json({

                mensaje:"Perfil físico no encontrado"

            });

        }



        res.json(perfil);



    }catch(error){


        res.status(500).json({

            mensaje:"Error al buscar perfil físico del usuario",

            error:error.message

        });


    }


});

router.get("/:id", async (req, res) => {

    try {

        const perfil = await PerfilFisico.findById(req.params.id)
            .populate("usuario");

        if (!perfil) {
            return res.status(404).json({
                mensaje: "Perfil físico no encontrado"
            });
        }

        res.json(perfil);

    } catch(error){

        res.status(500).json({
            mensaje: "Error al buscar perfil físico",
            error: error.message
        });

    }

});

router.put("/:id", verificarToken, async(req,res)=>{
    try{

        const perfilActualizado = await PerfilFisico.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json({
            mensaje:"Perfil físico actualizado correctamente",
            perfil: perfilActualizado
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al actualizar perfil físico",
            error:error.message
        });

    }

});

router.delete("/:id", verificarToken, async(req,res)=>{
    try{

        await PerfilFisico.findByIdAndDelete(req.params.id);

        res.json({
            mensaje:"Perfil físico eliminado correctamente"
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al eliminar perfil físico",
            error:error.message
        });

    }

});