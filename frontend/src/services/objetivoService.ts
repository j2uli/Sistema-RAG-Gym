import api from "./api";


export const obtenerObjetivo = async (
    usuarioId:string
)=>{


    const respuesta = await api.get(

        `/objetivos/usuario/${usuarioId}`

    );


    return respuesta.data;


};