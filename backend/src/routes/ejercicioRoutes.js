const express = require("express");
const router = express.Router();

const Ejercicio = require("../models/Ejercicio");


// Crear ejercicio
router.post("/", async(req,res)=>{

    try{

        const ejercicio = new Ejercicio(req.body);

        await ejercicio.save();

        res.status(201).json({
            mensaje:"Ejercicio creado correctamente",
            ejercicio
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al crear ejercicio",
            error:error.message
        });

    }

});


// Obtener todos
router.get("/", async(req,res)=>{

    try{

        const ejercicios = await Ejercicio.find();

        res.json(ejercicios);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al obtener ejercicios",
            error:error.message
        });

    }

});


// Obtener por ID
router.get("/:id", async(req,res)=>{

    try{

        const ejercicio = await Ejercicio.findById(req.params.id);

        if(!ejercicio){
            return res.status(404).json({
                mensaje:"Ejercicio no encontrado"
            });
        }

        res.json(ejercicio);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al buscar ejercicio",
            error:error.message
        });

    }

});


// Actualizar
router.put("/:id", async(req,res)=>{

    try{

        const actualizado = await Ejercicio.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json({
            mensaje:"Ejercicio actualizado correctamente",
            ejercicio:actualizado
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al actualizar ejercicio",
            error:error.message
        });

    }

});


// Eliminar
router.delete("/:id", async(req,res)=>{

    try{

        await Ejercicio.findByIdAndDelete(req.params.id);

        res.json({
            mensaje:"Ejercicio eliminado correctamente"
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al eliminar ejercicio",
            error:error.message
        });

    }

});


module.exports = router;