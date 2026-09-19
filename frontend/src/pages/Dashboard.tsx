import {
    useEffect,
    useState
} from "react";


import AdminCard from "../components/AdminCard";


import {
    obtenerResumen
} from "../services/dashboardService";



interface Resumen {

    usuarios:number;

    rutinas:number;

    ejercicios:number;

    maquinas:number;

}



function Dashboard(){


    const [resumen,setResumen] =
    useState<Resumen>({

        usuarios:0,

        rutinas:0,

        ejercicios:0,

        maquinas:0

    });




    useEffect(()=>{


        const cargarResumen = async()=>{


            try{


                const datos =
                await obtenerResumen();



                setResumen(datos);



            }catch(error){


                console.error(
                    "Error cargando resumen",
                    error
                );


            }


        };



        cargarResumen();



    },[]);





    return (

        <div>


            <h1

            style={{

                color:"#39ff14",

                fontSize:"35px"

            }}

            >

                Dashboard Mítico Fitness

            </h1>



            <p>

                Panel de administración del gimnasio

            </p>



            <hr

            style={{

                borderColor:"#39ff14",

                margin:"25px 0"

            }}

            />





            <div

            style={{

                display:"grid",

                gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",

                gap:"25px"

            }}

            >



                <AdminCard

                titulo="Usuarios"

                valor={String(resumen.usuarios)}

                icono="👥"

                />



                <AdminCard

                titulo="Rutinas"

                valor={String(resumen.rutinas)}

                icono="🔥"

                />



                <AdminCard

                titulo="Ejercicios"

                valor={String(resumen.ejercicios)}

                icono="🏋️"

                />



                <AdminCard

                titulo="Máquinas"

                valor={String(resumen.maquinas)}

                icono="⚙️"

                />



            </div>





            <div

            style={{

                marginTop:"40px",

                display:"grid",

                gridTemplateColumns:
                "repeat(auto-fit,minmax(350px,1fr))",

                gap:"25px"

            }}

            >



                <div

                style={{

                    background:"#111",

                    padding:"25px",

                    borderRadius:"15px",

                    border:"1px solid #39ff14"

                }}

                >


                    <h2>

                        📋 Actividad reciente

                    </h2>


                    <p>

                        Aquí aparecerán las últimas acciones del sistema.

                    </p>


                </div>





                <div

                style={{

                    background:"#111",

                    padding:"25px",

                    borderRadius:"15px",

                    border:"1px solid #39ff14"

                }}

                >


                    <h2>

                        📊 Resumen

                    </h2>


                    <p>

                        Estadísticas generales del gimnasio.

                    </p>


                </div>


            </div>



        </div>

    );


}


export default Dashboard;