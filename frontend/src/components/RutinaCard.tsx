import {
    useEffect,
    useState
} from "react";


import {
    useAuth
} from "../context/AuthContext";


import {
    obtenerRutina
} from "../services/rutinaService";



interface Rutina {

    _id:string;
    nombre:string;
    objetivo:string;
    frecuencia:string;
    descripcion:string;
    estado:string;

}



function RutinaCard(){


    const {
        usuario
    } = useAuth();



    const [
        rutina,
        setRutina
    ] = useState<Rutina | null>(null);




    useEffect(()=>{


        const cargarRutina = async()=>{


            if(usuario){


                const datos =
                    await obtenerRutina(
                        usuario.id
                    );


                setRutina(datos);

            }


        };


        cargarRutina();


    },[usuario]);





    if(!rutina){

        return (

            <div>
                Cargando rutina...
            </div>

        );

    }




    return (

        <div>


            <h3>
                Rutina actual
            </h3>



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

    );


}


export default RutinaCard;