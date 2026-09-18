const express = require("express");
const router = express.Router();

const Maquina = require("../models/Maquina");


// Crear máquina
router.post("/", async(req,res)=>{

    try{

        const maquina = new Maquina(req.body);

        await maquina.save();

        res.status(201).json({
            mensaje:"Máquina creada correctamente",
            maquina
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al crear máquina",
            error:error.message
        });

    }

});


// Obtener todas
router.get("/", async(req,res)=>{

    try{

        const maquinas = await Maquina.find();

        res.json(maquinas);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al obtener máquinas",
            error:error.message
        });

    }

});


// Obtener por ID
router.get("/:id", async(req,res)=>{

    try{

        const maquina = await Maquina.findById(req.params.id);

        if(!maquina){
            return res.status(404).json({
                mensaje:"Máquina no encontrada"
            });
        }

        res.json(maquina);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al buscar máquina",
            error:error.message
        });

    }

});


// Actualizar
router.put("/:id", async(req,res)=>{

    try{

        const actualizada = await Maquina.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json({
            mensaje:"Máquina actualizada correctamente",
            maquina:actualizada
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al actualizar máquina",
            error:error.message
        });

    }

});


// Eliminar
router.delete("/:id", async(req,res)=>{

    try{

        await Maquina.findByIdAndDelete(req.params.id);

        res.json({
            mensaje:"Máquina eliminada correctamente"
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al eliminar máquina",
            error:error.message
        });

    }

});


module.exports = router;