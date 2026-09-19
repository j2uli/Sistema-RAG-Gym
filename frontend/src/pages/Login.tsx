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


import logo from "../assets/logo.png";



function Login(){


    const navigate = useNavigate();


    const {
        iniciarSesion
    } = useAuth();



    const [correo,setCorreo]=useState("");

    const [password,setPassword]=useState("");

    const [error,setError]=useState("");




    const handleLogin = async(
        e:React.FormEvent
    )=>{


        e.preventDefault();


        try{


            const respuesta =
            await login({

                correo,

                password

            });



            iniciarSesion(

                respuesta.usuario,

                respuesta.token

            );


            navigate("/dashboard");



        }catch(error){


            setError(
                "Correo o contraseña incorrectos"
            );

        }


    };





    return(


        <div
        style={{

            minHeight:"100vh",

            display:"flex",

            justifyContent:"center",

            alignItems:"center",

            background:"#050505"

        }}
        >



            <div

            style={{

                width:"380px",

                background:"#111",

                padding:"40px",

                borderRadius:"20px",

                boxShadow:
                "0 0 25px #39ff14",

                textAlign:"center"

            }}

            >



                <img

                src={logo}

                alt="Mitico Fitness"

                style={{

                    width:"180px",

                    marginBottom:"20px"

                }}

                />




                <h1

                style={{

                    color:"#39ff14",

                    marginBottom:"10px"

                }}

                >

                    Bienvenido

                </h1>




                <p

                style={{

                    color:"#aaa",

                    marginBottom:"30px"

                }}

                >

                    Ingresa a tu entrenamiento

                </p>





                <form
                onSubmit={handleLogin}
                >



                    <input

                    type="email"

                    placeholder="Correo electrónico"

                    value={correo}

                    onChange={
                        e=>setCorreo(
                            e.target.value
                        )
                    }


                    style={{

                        width:"100%",

                        padding:"14px",

                        marginBottom:"15px",

                        background:"#050505",

                        border:
                        "1px solid #333",

                        color:"white",

                        borderRadius:"10px"

                    }}

                    />





                    <input

                    type="password"

                    placeholder="Contraseña"

                    value={password}

                    onChange={
                        e=>setPassword(
                            e.target.value
                        )
                    }


                    style={{

                        width:"100%",

                        padding:"14px",

                        marginBottom:"20px",

                        background:"#050505",

                        border:
                        "1px solid #333",

                        color:"white",

                        borderRadius:"10px"

                    }}

                    />






                    <button

                    type="submit"


                    style={{

                        width:"100%",

                        padding:"14px",

                        background:"#39ff14",

                        color:"black",

                        fontWeight:"bold",

                        border:"none",

                        borderRadius:"10px",

                        cursor:"pointer"

                    }}

                    >

                        INICIAR SESIÓN

                    </button>




                </form>





                {

                    error &&

                    <p

                    style={{

                        color:"red",

                        marginTop:"20px"

                    }}

                    >

                        {error}

                    </p>

                }





                <p

                style={{

                    marginTop:"30px",

                    color:"#777",

                    fontSize:"13px"

                }}

                >

                    Mítico Fitness
                    <br/>
                    Entrena. Supérate. Evoluciona.

                </p>



            </div>



        </div>


    );

}



export default Login;