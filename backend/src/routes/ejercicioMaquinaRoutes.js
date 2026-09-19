const express = require("express");
const router = express.Router();

const EjercicioMaquina = require("../models/EjercicioMaquina");
const verificarToken = require("../middleware/authMiddleware");


// Crear relación
router.post("/", verificarToken, async(req,res)=>{

    try{

        const relacion = new EjercicioMaquina(req.body);

        await relacion.save();

        res.status(201).json({
            mensaje:"Relación creada correctamente",
            relacion
        });

    }catch(error){

        res.status(500).json({
            mensaje:"Error al crear relación",
            error:error.message
        });

    }

});



// Obtener todas las relaciones
router.get("/", verificarToken, async(req,res)=>{

    try{

        const relaciones = await EjercicioMaquina.find()
            .populate("ejercicio")
            .populate("maquina");

        res.json(relaciones);

    }catch(error){

        res.status(500).json({
            mensaje:"Error al obtener relaciones",
            error:error.message
        });

    }

});



// Obtener por ID
router.get("/:id", verificarToken, async(req,res)=>{

    try{

        const relacion = await EjercicioMaquina.findById(req.params.id)
            .populate("ejercicio")
            .populate("maquina");


        if(!relacion){

            return res.status(404).json({
                mensaje:"Relación no encontrada"
            });

        }


        res.json(relacion);


    }catch(error){

        res.status(500).json({
            mensaje:"Error al buscar relación",
            error:error.message
        });

    }

});



// Actualizar
router.put("/:id", verificarToken, async(req,res)=>{

    try{

        const actualizada =
            await EjercicioMaquina.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new:true
                }
            );


        res.json({

            mensaje:"Relación actualizada correctamente",

            relacion:actualizada

        });


    }catch(error){

        res.status(500).json({
            mensaje:"Error al actualizar relación",
            error:error.message
        });

    }

});



// Eliminar
router.delete("/:id", verificarToken, async(req,res)=>{

    try{

        await EjercicioMaquina.findByIdAndDelete(req.params.id);


        res.json({

            mensaje:"Relación eliminada correctamente"

        });


    }catch(error){

        res.status(500).json({

            mensaje:"Error al eliminar relación",

            error:error.message

        });

    }

});


module.exports = router;