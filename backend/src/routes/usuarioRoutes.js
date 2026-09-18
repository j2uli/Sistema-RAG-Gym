const express = require("express");
const router = express.Router();

const Usuario = require("../models/Usuario");


router.post("/", async (req, res) => {

    try {

        const nuevoUsuario = new Usuario(req.body);

        await nuevoUsuario.save();

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            usuario: nuevoUsuario
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al crear usuario",
            error: error.message
        });

    }

});


module.exports = router;

router.get("/", async (req, res) => {

    try {

        const usuarios = await Usuario.find();

        res.json(usuarios);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener usuarios",
            error: error.message
        });

    }

});

router.get("/:id", async (req, res) => {

    try {

        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.json(usuario);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al buscar usuario",
            error: error.message
        });

    }

});

router.put("/:id", async (req, res) => {

    try {

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            mensaje: "Usuario actualizado correctamente",
            usuario: usuarioActualizado
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al actualizar usuario",
            error: error.message
        });

    }

});

router.delete("/:id", async (req, res) => {

    try {

        await Usuario.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: "Usuario eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al eliminar usuario",
            error: error.message
        });

    }

});