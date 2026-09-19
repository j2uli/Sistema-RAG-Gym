import api from "./api";


export const obtenerPerfilFisico = async (
    usuarioId: string
) => {


    const respuesta = await api.get(
        `/perfil-fisico/usuario/${usuarioId}`
    );


    return respuesta.data;


};