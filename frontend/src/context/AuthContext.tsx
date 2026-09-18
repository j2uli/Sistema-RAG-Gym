import {
    createContext,
    useContext,
    useState
} from "react";

import type {
    ReactNode
} from "react";
interface Usuario {

    id: string;
    nombre: string;
    rol: string;

}


interface AuthContextType {

    usuario: Usuario | null;
    token: string | null;
    iniciarSesion: (
        usuario: Usuario,
        token: string
    ) => void;

    cerrarSesion: () => void;

}


const AuthContext = createContext<AuthContextType | null>(null);



export const AuthProvider = ({
    children
}: {
    children: ReactNode
}) => {


    const [usuario, setUsuario] = useState<Usuario | null>(
        JSON.parse(
            localStorage.getItem("usuario") || "null"
        )
    );


    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );



    const iniciarSesion = (
        usuario: Usuario,
        token: string
    ) => {


        setUsuario(usuario);
        setToken(token);


        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );


        localStorage.setItem(
            "token",
            token
        );

    };



    const cerrarSesion = () => {

        setUsuario(null);
        setToken(null);

        localStorage.removeItem("usuario");
        localStorage.removeItem("token");

    };



    return (
    <AuthContext.Provider
        value={{
            usuario,
            token,
            iniciarSesion,
            cerrarSesion
        }}
    >
        {children}
    </AuthContext.Provider>
);

};



export const useAuth = () => {

    const contexto = useContext(AuthContext);


    if(!contexto){

        throw new Error(
            "useAuth debe usarse dentro de AuthProvider"
        );

    }


    return contexto;

};