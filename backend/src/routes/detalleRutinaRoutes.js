const express = require("express");
const router = express.Router();

const DetalleRutina = require("../models/DetalleRutina");


// Crear detalle
router.post("/", async(req,res)=>{

    try{

        const detalle = new DetalleRutina(req.body);

        await detalle.save();

        res.status(201).json({
            mensaje:"Detalle de rutina creado correctamente",
            detalle
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al crear detalle",
            error:error.message
        });

    }

});


// Obtener todos
router.get("/", async(req,res)=>{

    try{

        const detalles = await DetalleRutina.find()
            .populate("rutina")
            .populate("ejercicio");

        res.json(detalles);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al obtener detalles",
            error:error.message
        });

    }

});


// Obtener por ID
router.get("/:id", async(req,res)=>{

    try{

        const detalle = await DetalleRutina.findById(req.params.id)
            .populate("rutina")
            .populate("ejercicio");

        if(!detalle){
            return res.status(404).json({
                mensaje:"Detalle no encontrado"
            });
        }

        res.json(detalle);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al buscar detalle",
            error:error.message
        });

    }

});


// Actualizar
router.put("/:id", async(req,res)=>{

    try{

        const actualizado = await DetalleRutina.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json({
            mensaje:"Detalle actualizado correctamente",
            detalle:actualizado
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al actualizar detalle",
            error:error.message
        });

    }

});


// Eliminar
router.delete("/:id", async(req,res)=>{

    try{

        await DetalleRutina.findByIdAndDelete(req.params.id);

        res.json({
            mensaje:"Detalle eliminado correctamente"
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al eliminar detalle",
            error:error.message
        });

    }

});


module.exports = router;