import {
    useEffect,
    useState
} from "react";


import {
    useAuth
} from "../context/AuthContext";


import {
    obtenerObjetivo
} from "../services/objetivoService";



interface Objetivo {

    objetivo:string;

    descripcion:string;

}




function ObjetivoCard(){


    const {
        usuario
    } = useAuth();



    const [
        objetivo,
        setObjetivo
    ] = useState<Objetivo | null>(null);




    useEffect(()=>{


        const cargarObjetivo = async()=>{


            if(usuario){


                const datos =
                    await obtenerObjetivo(
                        usuario.id
                    );


                setObjetivo(datos);


            }


        };


        cargarObjetivo();


    },[usuario]);





    if(!objetivo){

        return (

            <div>

                Cargando objetivo...

            </div>

        );

    }




    return (

        <div>


            <h3>
                Objetivo
            </h3>



            <p>

                Meta:
                {" "}
                {objetivo.objetivo}

            </p>



            <p>

                Descripción:
                {" "}
                {objetivo.descripcion}

            </p>



        </div>

    );


}


export default ObjetivoCard;