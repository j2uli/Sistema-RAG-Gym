import api from "./api";


export const obtenerUsuario = async(
    id:string
)=>{


    const respuesta = await api.get(
        `/usuarios/${id}`
    );


    return respuesta.data;


};