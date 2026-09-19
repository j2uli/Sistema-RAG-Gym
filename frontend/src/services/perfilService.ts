import api from "./api";


export const obtenerPerfiles = async()=>{


    const respuesta = await api.get(
        "/perfil-fisico"
    );


    return respuesta.data;


};