import api from "./api";


export const obtenerRutina = async (
    usuarioId:string
)=>{


    const respuesta = await api.get(

        `/rutinas/usuario/${usuarioId}`

    );


    console.log("RESPUESTA BACKEND RUTINA:", respuesta.data);


    return respuesta.data;


};