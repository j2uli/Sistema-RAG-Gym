import api from "./api";


interface LoginDatos {

    correo: string;
    password: string;

}


export const login = async (datos: LoginDatos) => {

    const respuesta = await api.post(
        "/auth/login",
        datos
    );

    return respuesta.data;

};