import api from "./api";


export const obtenerMaquinas = async()=>{


    const respuesta =

    await api.get(

        "/maquinas"

    );


    return respuesta.data;


};