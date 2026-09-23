import api from "./api";


export const obtenerDetalleRutina = async(
    rutinaId:string
)=>{


    const respuesta = await api.get(

        `/detalle-rutina/rutina/${rutinaId}`

    );


    return respuesta.data;


};