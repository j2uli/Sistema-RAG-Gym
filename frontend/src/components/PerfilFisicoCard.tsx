import {
    useEffect,
    useState
} from "react";


import {
    useAuth
} from "../context/AuthContext";


import {
    obtenerPerfilFisico
} from "../services/perfilService";



interface PerfilFisico {

    peso:number;

    altura:number;

    imc:number;

    nivel_experiencia:string;

    lesiones:string;

    disponibilidad:string;

}



function PerfilFisicoCard(){


    const {
        usuario
    } = useAuth();



    const [
        perfil,
        setPerfil
    ] = useState<PerfilFisico | null>(null);




    useEffect(()=>{


        const cargarPerfil = async()=>{


            if(usuario){


                const datos =
                    await obtenerPerfilFisico(
                        usuario.id
                    );


                setPerfil(datos);


            }


        };


        cargarPerfil();


    },[usuario]);




    if(!perfil){

        return (

            <div>

                Cargando perfil físico...

            </div>

        );

    }




    return (

        <div>


            <h3>
                Perfil físico
            </h3>



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



        </div>

    );


}


export default PerfilFisicoCard;