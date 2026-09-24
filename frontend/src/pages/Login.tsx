import {
    useState,
    useEffect
} from "react";

import type {
    CSSProperties
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


import Toast from "../components/ui/Toast";



function Login(){


    const navigate = useNavigate();


    const {
        iniciarSesion
    } = useAuth();



    const [correo,setCorreo] = useState("");

    const [password,setPassword] = useState("");


    const [mostrarPassword,setMostrarPassword] = useState(false);


    const [mensaje,setMensaje] = useState("");

    const [tipoMensaje,setTipoMensaje] =
    useState<"error" | "success">("error");






    useEffect(()=>{


        if(mensaje){


            const timer = setTimeout(()=>{

                setMensaje("");

            },7000);



            return ()=>clearTimeout(timer);


        }


    },[mensaje]);









    const handleLogin = async(
        e:React.FormEvent
    )=>{


        e.preventDefault();



        try{


            const respuesta = await login({

                correo,

                password

            });



            iniciarSesion(

                respuesta.usuario,

                respuesta.token

            );



            navigate("/dashboard");


        }catch(error:any){



            setTipoMensaje("error");



            if(error.response?.status === 403){


                setMensaje(
                    "Solo los administradores pueden ingresar"
                );


            }
            else if(error.response?.status === 401){


                setMensaje(
                    "Correo o contraseña incorrectos"
                );


            }
            else{


                setMensaje(
                    "Error al iniciar sesión"
                );


            }


        }



    };









    return(


        <div style={containerStyle}>


            {
                mensaje &&

                <Toast

                mensaje={mensaje}

                tipo={tipoMensaje}

                />

            }





            <div style={cardStyle}>


                <img

                src={logo}

                alt="Mitico Fitness"

                style={logoStyle}

                />




                <h1 style={titleStyle}>

                    Bienvenido

                </h1>



                <p style={subtitleStyle}>

                    Ingresa al panel administrativo

                </p>





                <form onSubmit={handleLogin}>



                    <input

                    type="email"

                    placeholder="Correo electrónico"

                    value={correo}

                    onChange={
                        e=>setCorreo(e.target.value)
                    }

                    style={inputStyle}

                    />






                    <div style={passwordContainer}>


                        <input

                        type={
                            mostrarPassword
                            ?
                            "text"
                            :
                            "password"
                        }


                        placeholder="Contraseña"


                        value={password}


                        onChange={
                            e=>setPassword(e.target.value)
                        }


                        style={passwordInputStyle}


                        />


<button

type="button"

onClick={()=>setMostrarPassword(!mostrarPassword)}

style={eyeStyle}

>


<svg

width="24"

height="24"

viewBox="0 0 24 24"

fill="none"

stroke="#39ff14"

strokeWidth="2"

strokeLinecap="round"

strokeLinejoin="round"

>


<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12"/>


<circle

cx="12"

cy="12"

r="3"

/>


</svg>



</button>
                    </div>







                    <button

                    type="submit"

                    style={buttonStyle}

                    >

                    INICIAR SESIÓN

                    </button>




                </form>






                <p style={footerStyle}>

                    Mítico Fitness

                    <br/>

                    Entrena. Supérate. Evoluciona.

                </p>



            </div>



        </div>


    );

}





const containerStyle:CSSProperties={


    minHeight:"100vh",

    display:"flex",

    justifyContent:"center",

    alignItems:"center",

    background:"#050505"


};




const cardStyle:CSSProperties={


    width:"380px",

    background:"#111",

    padding:"40px",

    borderRadius:"20px",

    boxShadow:"0 0 25px #39ff14",

    textAlign:"center"


};




const logoStyle:CSSProperties={


    width:"180px",

    marginBottom:"20px"


};




const titleStyle:CSSProperties={


    color:"#39ff14",

    marginBottom:"10px"


};




const subtitleStyle:CSSProperties={


    color:"#aaa",

    marginBottom:"30px"


};




const inputStyle:CSSProperties={


    width:"100%",


    padding:"14px",


    marginBottom:"15px",


    background:"#050505",


    border:"1px solid #333",


    color:"white",


    borderRadius:"10px",


    boxSizing:"border-box"


};




const passwordContainer:CSSProperties={

    position:"relative",

    display:"flex",

    alignItems:"center"

};



const passwordInputStyle:CSSProperties={


    ...inputStyle,

    paddingRight:"55px"


};

const eyeStyle:CSSProperties={


    position:"absolute",

    right:"15px",

    top:"50%",

    transform:"translateY(-65%)",

    cursor:"pointer",

    background:"transparent",

    border:"none",

    width:"35px",

    height:"35px",

    padding:0,

    display:"flex",

    alignItems:"center",

    justifyContent:"center"


};

const buttonStyle:CSSProperties={


    width:"100%",


    padding:"14px",


    background:"#39ff14",


    color:"black",


    fontWeight:"bold",


    border:"none",


    borderRadius:"10px",


    cursor:"pointer"


};




const footerStyle:CSSProperties={


    marginTop:"30px",


    color:"#777",


    fontSize:"13px"


};



export default Login;