import {
    useEffect,
    useState
} from "react";


import api from "../services/api";


interface Usuario {


    _id:string;

    nombre:string;

    apellido:string;

    correo:string;

    rol:string;

}




function Usuarios(){


    const [
        usuarios,
        setUsuarios
    ] = useState<Usuario[]>([]);





    useEffect(()=>{


        const cargarUsuarios = async()=>{


            try{


                const respuesta =
                await api.get("/usuarios");


                setUsuarios(
                    respuesta.data
                );


            }catch(error){


                console.error(
                    "Error cargando usuarios",
                    error
                );


            }


        };



        cargarUsuarios();


    },[]);






    return (


        <div>


            <h1

            style={{

                color:"#39ff14"

            }}

            >

                👥 Usuarios del gimnasio

            </h1>




            <div

            style={{

                display:"grid",

                gap:"20px"

            }}

            >


            {

                usuarios.map((usuario)=>(


                    <div

                    key={usuario._id}

                    style={{

                        background:"#111",

                        border:
                        "1px solid #39ff14",

                        borderRadius:"15px",

                        padding:"20px"

                    }}

                    >



                        <h2>

                            {usuario.nombre} {usuario.apellido}

                        </h2>



                        <p>

                            📧 {usuario.correo}

                        </p>



                        <p>

                            Rol:
                            {" "}
                            {usuario.rol}

                        </p>
                        <button

onClick={()=>{

    window.location.href =
    `/usuarios/${usuario._id}`;

}}

style={{

    marginTop:"15px",

    background:"#39ff14",

    border:"none",

    padding:"10px 20px",

    borderRadius:"10px",

    cursor:"pointer",

    fontWeight:"bold"

}}

>

Ver perfil

</button>


                    </div>


                ))

            }


            </div>


        </div>


    );


}


export default Usuarios;