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


import {
    obtenerDetalleRutina
} from "../services/detalleRutinaService";




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


    _id:string;

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




interface Ejercicio{


    nombre:string;

    grupo_muscular:string;


}




interface DetalleRutina{


    dia:string;

    series:number;

    repeticiones:number;

    peso:number;

    descanso:number;

    ejercicio:Ejercicio;


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




    const [
        detallesRutina,
        setDetallesRutina
    ] = useState<DetalleRutina[]>([]);







    useEffect(()=>{


        const cargarDatos = async()=>{


            try{


                if(id){



                    const datosUsuario =
                    await obtenerUsuario(id);


                    setUsuario(datosUsuario);







                    const perfiles =
                    await obtenerPerfiles();



                    const perfilUsuario =
perfiles.find(

(p:any)=>

p.usuario?._id?.toString() === id?.toString()

);


                    setPerfil(
                        perfilUsuario
                    );








                    const objetivos =
                    await obtenerObjetivos();



                   const objetivoUsuario =
objetivos.find(

(o:any)=>

o.usuario?._id?.toString() === id?.toString()

);


                    setObjetivo(
                        objetivoUsuario
                    );









                   try {

    const rutinaUsuario =
    await obtenerRutina(id);


    setRutina(rutinaUsuario);



 if(rutinaUsuario && rutinaUsuario._id){

    const detalles =
    await obtenerDetalleRutina(
        rutinaUsuario._id
    );

    setDetallesRutina(detalles);

}else{

    setDetallesRutina([]);

}

}catch(error){


    console.log(
        "Usuario sin rutina asignada"
    );


    setRutina(null);

    setDetallesRutina([]);


}





                    const historiales =
                    await obtenerHistorial();



                    const progresoUsuario =

historiales.filter(

(h:any)=>

h.usuario?._id?.toString() === id?.toString()

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





                <h3

                style={{

                    color:"#39ff14",

                    marginTop:"25px"

                }}

                >

                    🏋 Ejercicios asignados

                </h3>






                {
                detallesRutina.map(

                    (detalle,index)=>(


                    <div

                    key={index}

                    style={{

                        background:"#050505",

                        border:"1px solid #333",

                        padding:"15px",

                        borderRadius:"10px",

                        marginTop:"15px"

                    }}

                    >



                        <h3>

                        🏋 {detalle.ejercicio.nombre}

                        </h3>



                        <p>

                        Grupo muscular:
                        {" "}
                        {detalle.ejercicio.grupo_muscular}

                        </p>



                        <p>

                        Día:
                        {" "}
                        {detalle.dia}

                        </p>



                        <p>

                        Series:
                        {" "}
                        {detalle.series}

                        </p>



                        <p>

                        Repeticiones:
                        {" "}
                        {detalle.repeticiones}

                        </p>



                        <p>

                        Peso:
                        {" "}
                        {detalle.peso} kg

                        </p>



                        <p>

                        Descanso:
                        {" "}
                        {detalle.descanso} segundos

                        </p>



                    </div>


                    )

                )

                }





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