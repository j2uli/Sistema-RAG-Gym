const jwt = require("jsonwebtoken");


const verificarToken = (req, res, next) => {

    try {

        // Obtener token del header
        const authHeader = req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({
                mensaje: "No existe token de acceso"
            });

        }


        // Formato esperado:
        // Bearer TOKEN

        const token = authHeader.split(" ")[1];


        if (!token) {

            return res.status(401).json({
                mensaje: "Token no válido"
            });

        }


        // Verificar token

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Guardar información del usuario
        req.usuario = decoded;


        next();


    } catch(error) {


        return res.status(401).json({
            mensaje: "Token inválido o expirado"
        });


    }

};


module.exports = verificarToken;