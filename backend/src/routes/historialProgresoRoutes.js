const express = require("express");
const router = express.Router();

const HistorialProgreso = require("../models/HistorialProgreso");
const verificarToken = require("../middleware/authMiddleware");

// Crear registro de progreso
router.post("/", async(req,res)=>{

    try{

        const historial = new HistorialProgreso(req.body);

        await historial.save();

        res.status(201).json({
            mensaje:"Historial de progreso creado correctamente",
            historial
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al crear historial",
            error:error.message
        });

    }

});


// Obtener todos los registros
router.get("/", verificarToken, async(req,res)=>{

    try{

        const historiales = await HistorialProgreso.find()
            .populate("usuario");

        res.json(historiales);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al obtener historiales",
            error:error.message
        });

    }

});


// Obtener por ID
router.get("/:id", async(req,res)=>{

    try{

        const historial = await HistorialProgreso.findById(req.params.id)
            .populate("usuario");

        if(!historial){
            return res.status(404).json({
                mensaje:"Registro de progreso no encontrado"
            });
        }

        res.json(historial);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al buscar historial",
            error:error.message
        });

    }

});


// Actualizar registro
router.put("/:id", async(req,res)=>{

    try{

        const actualizado = await HistorialProgreso.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json({
            mensaje:"Historial actualizado correctamente",
            historial:actualizado
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al actualizar historial",
            error:error.message
        });

    }

});


// Eliminar registro
router.delete("/:id", async(req,res)=>{

    try{

        await HistorialProgreso.findByIdAndDelete(req.params.id);

        res.json({
            mensaje:"Historial eliminado correctamente"
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al eliminar historial",
            error:error.message
        });

    }

});


module.exports = router;