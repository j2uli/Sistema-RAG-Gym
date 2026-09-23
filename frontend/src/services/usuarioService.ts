import api from "./api";



// Obtener todos los usuarios

export const obtenerUsuarios = async()=>{


    const respuesta = await api.get(
        "/usuarios"
    );


    return respuesta.data;


};




// Obtener usuario por ID

export const obtenerUsuario = async(
    id:string
)=>{


    const respuesta = await api.get(
        `/usuarios/${id}`
    );


    return respuesta.data;


};




// Crear usuario

export const crearUsuario = async(
    usuario:any
)=>{


    const respuesta = await api.post(

        "/usuarios",

        usuario

    );


    return respuesta.data;


};





// Actualizar usuario

export const actualizarUsuario = async(

    id:string,

    usuario:any

)=>{


    const respuesta = await api.put(

        `/usuarios/${id}`,

        usuario

    );


    return respuesta.data;


};





// Eliminar usuario

export const eliminarUsuario = async(

    id:string

)=>{


    const respuesta = await api.delete(

        `/usuarios/${id}`

    );


    return respuesta.data;


};





// Actualizar membresía

export const actualizarMembresia = async(

    id:string,

    membresia:any

)=>{


    const respuesta = await api.put(

        `/usuarios/${id}/membresia`,

        membresia

    );


    return respuesta.data;


};