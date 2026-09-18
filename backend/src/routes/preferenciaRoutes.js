const express = require("express");
const router = express.Router();

const PreferenciaUsuario = require("../models/PreferenciaUsuario");


// Crear preferencia
router.post("/", async (req, res) => {

    try {

        const preferencia = new PreferenciaUsuario(req.body);

        await preferencia.save();

        res.status(201).json({
            mensaje: "Preferencia creada correctamente",
            preferencia
        });

    } catch(error){

        res.status(500).json({
            mensaje: "Error al crear preferencia",
            error: error.message
        });

    }

});


// Obtener todas
router.get("/", async(req,res)=>{

    try{

        const preferencias = await PreferenciaUsuario.find()
            .populate("usuario");

        res.json(preferencias);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al obtener preferencias",
            error:error.message
        });

    }

});


// Obtener por ID
router.get("/:id", async(req,res)=>{

    try{

        const preferencia = await PreferenciaUsuario.findById(req.params.id)
            .populate("usuario");

        if(!preferencia){
            return res.status(404).json({
                mensaje:"Preferencia no encontrada"
            });
        }

        res.json(preferencia);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al buscar preferencia",
            error:error.message
        });

    }

});


// Actualizar
router.put("/:id", async(req,res)=>{

    try{

        const actualizada = await PreferenciaUsuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json({
            mensaje:"Preferencia actualizada correctamente",
            preferencia:actualizada
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al actualizar preferencia",
            error:error.message
        });

    }

});


// Eliminar
router.delete("/:id", async(req,res)=>{

    try{

        await PreferenciaUsuario.findByIdAndDelete(req.params.id);

        res.json({
            mensaje:"Preferencia eliminada correctamente"
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al eliminar preferencia",
            error:error.message
        });

    }

});


module.exports = router;