const express = require("express");
const router = express.Router();

const Rutina = require("../models/Rutina");
const verificarToken = require("../middleware/authMiddleware");


// Crear rutina
router.post("/", verificarToken, async(req,res)=>{
    try{

        const rutina = new Rutina(req.body);

        await rutina.save();

        res.status(201).json({
            mensaje:"Rutina creada correctamente",
            rutina
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al crear rutina",
            error:error.message
        });

    }
});



// Obtener todas
router.get("/", verificarToken, async(req,res)=>{
    try{

        const rutinas = await Rutina.find()
            .populate("usuario");

        res.json(rutinas);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al obtener rutinas",
            error:error.message
        });

    }
});



// Obtener rutina activa por usuario
router.get("/usuario/:usuarioId", verificarToken, async(req,res)=>{

    try{

        console.log(
            "BUSCANDO RUTINA:",
            req.params.usuarioId
        );


        const rutina = await Rutina.findOne({
            usuario:req.params.usuarioId,
            estado:"Activa"
        })
        .sort({
            fecha_creacion:-1
        })
        .populate("usuario");


        console.log(
            "RUTINA DEVUELTA:",
            rutina
        );


        if(!rutina){

            return res.status(404).json({
                mensaje:"Rutina no encontrada"
            });

        }


        res.json(rutina);


    }catch(error){

        res.status(500).json({
            mensaje:"Error al buscar rutina del usuario",
            error:error.message
        });

    }

});



// Obtener por ID
router.get("/:id", verificarToken, async(req,res)=>{
    try{

        const rutina = await Rutina.findById(req.params.id)
            .populate("usuario");


        if(!rutina){

            return res.status(404).json({
                mensaje:"Rutina no encontrada"
            });

        }


        res.json(rutina);


    }catch(error){

        res.status(500).json({
            mensaje:"Error al buscar rutina",
            error:error.message
        });

    }
});



// Actualizar
router.put("/:id", verificarToken, async(req,res)=>{

    try{

        const actualizada =
            await Rutina.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new:true
                }
            );


        res.json({
            mensaje:"Rutina actualizada correctamente",
            rutina:actualizada
        });


    }catch(error){

        res.status(500).json({
            mensaje:"Error al actualizar rutina",
            error:error.message
        });

    }

});



// Eliminar
router.delete("/:id", verificarToken, async(req,res)=>{

    try{

        await Rutina.findByIdAndDelete(req.params.id);


        res.json({
            mensaje:"Rutina eliminada correctamente"
        });


    }catch(error){

        res.status(500).json({
            mensaje:"Error al eliminar rutina",
            error:error.message
        });

    }

});


module.exports = router;