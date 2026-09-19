import api from "./api";


export const obtenerRutina = async(
    usuarioId:string
)=>{


    const respuesta = await api.get(

        `/rutinas/usuario/${usuarioId}`

    );


    return respuesta.data;


};