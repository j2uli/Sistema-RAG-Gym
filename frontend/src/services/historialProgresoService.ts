import api from "./api";


export const obtenerHistorial = async()=>{


    const respuesta = await api.get(
        "/historial-progreso"
    );


    return respuesta.data;


};