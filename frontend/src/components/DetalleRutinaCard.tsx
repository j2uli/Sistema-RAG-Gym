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


import {
    obtenerDetalleRutina
} from "../services/detalleRutinaService";



interface Ejercicio {

    nombre:string;
    grupo_muscular:string;

}



interface DetalleRutina {

    dia:string;
    series:number;
    repeticiones:number;
    peso:number;
    descanso:number;
    ejercicio:Ejercicio;

}



function DetalleRutinaCard(){


    const {
        usuario
    } = useAuth();



    const [
        detalles,
        setDetalles
    ] = useState<DetalleRutina[]>([]);




    useEffect(()=>{


        const cargarDetalles = async()=>{


            if(usuario){


                const rutina =
                    await obtenerRutina(
                        usuario.id
                    );
                    console.log("RUTINA ACTUAL:", rutina);


                const datos =
                    await obtenerDetalleRutina(
                        rutina._id
                    );
                    console.log("DETALLES:", datos);


                setDetalles(datos);


            }


        };



        cargarDetalles();


    },[usuario]);





 if(detalles.length === 0){
    return (
        <div>
            Cargando ejercicios...
        </div>
    );
}





    return (

        <div>


            <h3>
                Ejercicios de la rutina
            </h3>



            {
                detalles.map((detalle,index)=>(


                    <div key={index}>


                        <h4>
                            {detalle.dia}
                        </h4>


                        <p>
                            Ejercicio:
                            {" "}
                            {detalle.ejercicio.nombre}
                        </p>


                        <p>
                            Grupo muscular:
                            {" "}
                            {detalle.ejercicio.grupo_muscular}
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


                ))
            }


        </div>

    );


}


export default DetalleRutinaCard;