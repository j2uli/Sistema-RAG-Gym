import {
    useEffect,
    useState
} from "react";


import {
    useParams
} from "react-router-dom";


import {
    obtenerUsuario
} from "../services/usuarioService";


import {
    obtenerPerfiles
} from "../services/perfilService";


import {
    obtenerObjetivos
} from "../services/objetivoService";


import {
    obtenerRutina
} from "../services/rutinaService";


import {
    obtenerHistorial
} from "../services/historialProgresoService";




interface Usuario{

    nombre:string;

    apellido:string;

    correo:string;

    rol:string;

}



interface Perfil{


    peso:number;

    altura:number;

    imc:number;

    nivel_experiencia:string;

    lesiones:string;

    disponibilidad:string;


}



interface Objetivo{


    meta:string;

    descripcion:string;


}



interface Rutina{


    nombre:string;

    objetivo:string;

    frecuencia:string;

    estado:string;


}



interface Progreso{


    peso:number;

    grasa_corporal:number;

    rendimiento:string;

    observaciones:string;


}







function UsuarioDetalle(){



    const {
        id
    } = useParams();





    const [
        usuario,
        setUsuario
    ] = useState<Usuario | null>(null);




    const [
        perfil,
        setPerfil
    ] = useState<Perfil | null>(null);




    const [
        objetivo,
        setObjetivo
    ] = useState<Objetivo | null>(null);




    const [
        rutina,
        setRutina
    ] = useState<Rutina | null>(null);




    const [
        progreso,
        setProgreso
    ] = useState<Progreso | null>(null);








    useEffect(()=>{


        const cargarDatos = async()=>{


            try{


                if(id){



                    // Usuario

                    const datosUsuario =
                    await obtenerUsuario(id);


                    setUsuario(
                        datosUsuario
                    );






                    // Perfil físico

                    const perfiles =
                    await obtenerPerfiles();



                    const perfilUsuario =
                    perfiles.find(

                        (p:any)=>

                        p.usuario._id === id

                    );



                    setPerfil(
                        perfilUsuario
                    );









                    // Objetivo


                    const objetivos =
                    await obtenerObjetivos();



                    const objetivoUsuario =
                    objetivos.find(

                        (o:any)=>

                        o.usuario._id === id

                    );



                    setObjetivo(
                        objetivoUsuario
                    );









                    // Rutina


                    const rutinaUsuario =
                    await obtenerRutina(id);



                    setRutina(
                        rutinaUsuario
                    );









                    // Progreso


                    const historiales =
                    await obtenerHistorial();




                    const progresoUsuario =

                    historiales.filter(

                        (h:any)=>

                        h.usuario._id === id

                    )
                    .pop();




                    setProgreso(
                        progresoUsuario
                    );



                }



            }catch(error){


                console.error(

                    "Error cargando información",

                    error

                );


            }



        };




        cargarDatos();



    },[id]);








    if(!usuario){


        return(

            <h2>

                Cargando usuario...

            </h2>

        );


    }







    const cardStyle = {


        background:"#111",

        border:"1px solid #39ff14",

        padding:"25px",

        borderRadius:"15px",

        marginTop:"20px"


    };







    return(



        <div>





            <h1

            style={{

                color:"#39ff14",

                fontSize:"35px"

            }}

            >

                👤 Perfil del usuario

            </h1>









            <div

            style={cardStyle}

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



            </div>









            {

            perfil &&



            <div

            style={cardStyle}

            >


                <h2>

                    💪 Perfil físico

                </h2>



                <p>

                Peso:
                {" "}
                {perfil.peso} kg

                </p>



                <p>

                Altura:
                {" "}
                {perfil.altura} m

                </p>



                <p>

                IMC:
                {" "}
                {perfil.imc}

                </p>



                <p>

                Nivel:
                {" "}
                {perfil.nivel_experiencia}

                </p>



                <p>

                Lesiones:
                {" "}
                {perfil.lesiones}

                </p>



                <p>

                Disponibilidad:
                {" "}
                {perfil.disponibilidad}

                </p>



            </div>

            }









            {

            objetivo &&



            <div

            style={cardStyle}

            >


                <h2>

                    🎯 Objetivo

                </h2>



                <p>

                Meta:
                {" "}
                {objetivo.meta}

                </p>



                <p>

                {objetivo.descripcion}

                </p>



            </div>


            }









            {

            rutina &&



            <div

            style={cardStyle}

            >


                <h2>

                    🔥 Rutina actual

                </h2>



                <p>

                Nombre:
                {" "}
                {rutina.nombre}

                </p>



                <p>

                Objetivo:
                {" "}
                {rutina.objetivo}

                </p>



                <p>

                Frecuencia:
                {" "}
                {rutina.frecuencia}

                </p>



                <p>

                Estado:
                {" "}
                {rutina.estado}

                </p>



            </div>


            }









            {

            progreso &&



            <div

            style={cardStyle}

            >


                <h2>

                    📈 Último progreso

                </h2>



                <p>

                Peso:
                {" "}
                {progreso.peso} kg

                </p>



                <p>

                Grasa corporal:
                {" "}
                {progreso.grasa_corporal} %

                </p>



                <p>

                Rendimiento:
                {" "}
                {progreso.rendimiento}

                </p>



                <p>

                Observaciones:
                {" "}
                {progreso.observaciones}

                </p>



            </div>


            }






        </div>



    );


}



export default UsuarioDetalle;