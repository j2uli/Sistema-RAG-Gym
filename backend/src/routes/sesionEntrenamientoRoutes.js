const express = require("express");
const router = express.Router();

const SesionEntrenamiento = require("../models/SesionEntrenamiento");
const verificarToken = require("../middleware/authMiddleware");

// Crear sesión
router.post("/", verificarToken, async(req,res)=>{
    try{

        const sesion = new SesionEntrenamiento(req.body);

        await sesion.save();

        res.status(201).json({
            mensaje:"Sesión creada correctamente",
            sesion
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al crear sesión",
            error:error.message
        });

    }

});


// Obtener todas
router.get("/", verificarToken, async(req,res)=>{
    try{

        const sesiones = await SesionEntrenamiento.find()
            .populate("usuario")
            .populate("rutina");

        res.json(sesiones);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al obtener sesiones",
            error:error.message
        });

    }

});


// Obtener por ID
router.get("/:id", verificarToken, async(req,res)=>{
    try{

        const sesion = await SesionEntrenamiento.findById(req.params.id)
            .populate("usuario")
            .populate("rutina");

        if(!sesion){
            return res.status(404).json({
                mensaje:"Sesión no encontrada"
            });
        }

        res.json(sesion);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al buscar sesión",
            error:error.message
        });

    }

});

// Obtener sesiones por usuario
router.get("/usuario/:usuarioId", verificarToken, async(req,res)=>{

    try{


        const sesiones =
            await SesionEntrenamiento.find({

                usuario:req.params.usuarioId

            })
            .sort({
                fecha:-1
            })
            .populate("usuario")
            .populate("rutina");



        res.json(sesiones);



    }catch(error){


        res.status(500).json({

            mensaje:"Error al obtener sesiones del usuario",

            error:error.message

        });

    }

});


// Actualizar
router.put("/:id", verificarToken, async(req,res)=>{
    try{

        const actualizada = await SesionEntrenamiento.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json({
            mensaje:"Sesión actualizada correctamente",
            sesion:actualizada
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al actualizar sesión",
            error:error.message
        });

    }

});


// Eliminar
router.delete("/:id", verificarToken, async(req,res)=>{
    try{

        await SesionEntrenamiento.findByIdAndDelete(req.params.id);

        res.json({
            mensaje:"Sesión eliminada correctamente"
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al eliminar sesión",
            error:error.message
        });

    }

});


module.exports = router;