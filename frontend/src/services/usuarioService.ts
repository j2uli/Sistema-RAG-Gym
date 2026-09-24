import api from "./api";



// Obtener usuarios (ADMIN)

export const obtenerUsuarios = async()=>{


    const respuesta = await api.get(
        "/admin/usuarios"
    );


    return respuesta.data;


};





// Obtener usuario por ID (ADMIN)

export const obtenerUsuario = async(
    id:string
)=>{


    const respuesta = await api.get(

        `/admin/usuarios/${id}`

    );


    return respuesta.data;


};







// Crear usuario (ADMIN)

export const crearUsuario = async(
    usuario:any
)=>{


    const respuesta = await api.post(

        "/admin/usuarios",

        usuario

    );


    return respuesta.data;


};







// Editar usuario (ADMIN)

export const editarUsuario = async(

    id:string,

    usuario:any

)=>{


    const respuesta = await api.put(

        `/admin/usuarios/${id}`,

        usuario

    );


    return respuesta.data;


};







// Eliminar usuario (ADMIN)

export const eliminarUsuario = async(

    id:string

)=>{


    const respuesta = await api.delete(

        `/admin/usuarios/${id}`

    );


    return respuesta.data;


};







// Actualizar membresía (ADMIN)

export const actualizarMembresia = async(

    id:string,

    membresia:any

)=>{


    const respuesta = await api.put(

        `/admin/usuarios/${id}/membresia`,

        membresia

    );


    return respuesta.data;


};