import api from "./api";


export const obtenerResumen = async()=>{


    const respuesta = await api.get(
        "/dashboard/resumen"
    );


    return respuesta.data;


};