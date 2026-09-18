import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";


import {
    login
} from "../services/authService";


import {
    useAuth
} from "../context/AuthContext";



function Login(){


    const navigate = useNavigate();


    const {
        iniciarSesion
    } = useAuth();



    const [correo,setCorreo] = useState("");

    const [password,setPassword] = useState("");


    const [error,setError] = useState("");



    const handleLogin = async (
        e: React.FormEvent
    ) => {


        e.preventDefault();


        try {


            const respuesta = await login({

                correo,

                password

            });



            iniciarSesion(

                respuesta.usuario,

                respuesta.token

            );


            navigate("/dashboard");



        } catch(error){


            setError(
                "Correo o contraseña incorrectos"
            );


        }


    };



    return (

        <div>


            <h1>
                Sistema RAG Gym
            </h1>


            <form
                onSubmit={handleLogin}
            >


                <input

                    type="email"

                    placeholder="Correo"

                    value={correo}

                    onChange={
                        e => setCorreo(e.target.value)
                    }

                />



                <input

                    type="password"

                    placeholder="Contraseña"

                    value={password}

                    onChange={
                        e => setPassword(e.target.value)
                    }

                />



                <button
                    type="submit"
                >

                    Iniciar sesión

                </button>



                {
                    error &&
                    <p>
                        {error}
                    </p>
                }


            </form>


        </div>

    );


}


export default Login;