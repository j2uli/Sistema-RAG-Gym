const express = require("express");
const router = express.Router();

const Usuario = require("../models/Usuario");
const Rutina = require("../models/Rutina");
const Ejercicio = require("../models/Ejercicio");
const Maquina = require("../models/Maquina");


router.get("/resumen", async(req,res)=>{

    try{


        const usuarios =
            await Usuario.countDocuments();


        const rutinas =
            await Rutina.countDocuments();


        const ejercicios =
            await Ejercicio.countDocuments();


        const maquinas =
            await Maquina.countDocuments();



        res.json({

            usuarios,
            rutinas,
            ejercicios,
            maquinas

        });



    }catch(error){


        res.status(500).json({

            mensaje:"Error obteniendo resumen",
            error:error.message

        });


    }


});


module.exports = router;