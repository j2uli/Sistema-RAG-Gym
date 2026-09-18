const express = require("express");
const router = express.Router();

const ObjetivoEntrenamiento = require("../models/ObjetivoEntrenamiento");
const verificarToken = require("../middleware/authMiddleware");

// Crear objetivo
router.post("/", verificarToken, async(req,res)=>{
    try {

        const objetivo = new ObjetivoEntrenamiento(req.body);

        await objetivo.save();

        res.status(201).json({
            mensaje: "Objetivo creado correctamente",
            objetivo
        });

    } catch(error){

        res.status(500).json({
            mensaje: "Error al crear objetivo",
            error: error.message
        });

    }

});


// Obtener todos
router.get("/", verificarToken, async(req,res)=>{
    try{

        const objetivos = await ObjetivoEntrenamiento.find()
            .populate("usuario");

        res.json(objetivos);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al obtener objetivos",
            error:error.message
        });

    }

});


// Obtener por ID
router.get("/:id", verificarToken, async(req,res)=>{
    try{

        const objetivo = await ObjetivoEntrenamiento.findById(req.params.id)
            .populate("usuario");

        if(!objetivo){
            return res.status(404).json({
                mensaje:"Objetivo no encontrado"
            });
        }

        res.json(objetivo);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al buscar objetivo",
            error:error.message
        });

    }

});


// Actualizar
router.put("/:id", verificarToken, async(req,res)=>{
    try{

        const actualizado = await ObjetivoEntrenamiento.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json({
            mensaje:"Objetivo actualizado correctamente",
            objetivo: actualizado
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al actualizar objetivo",
            error:error.message
        });

    }

});


// Eliminar
router.delete("/:id", verificarToken, async(req,res)=>{
    try{

        await ObjetivoEntrenamiento.findByIdAndDelete(req.params.id);

        res.json({
            mensaje:"Objetivo eliminado correctamente"
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al eliminar objetivo",
            error:error.message
        });

    }

});


module.exports = router;