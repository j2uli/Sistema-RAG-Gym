import {
    useEffect,
    useState
} from "react";


import {
    obtenerMaquinas
} from "../services/maquinaService";


import pressPecho from "../assets/maquinas/press-pecho.jpg";
import prensaPiernas from "../assets/maquinas/prensa-piernas.jpg";



interface Maquina{


    nombre:string;

    tipo:string;

    grupo_muscular:string;

    descripcion:string;

    estado:string;

    alternativas:string;


}






const imagenes:any = {


    "Press pecho máquina":
    pressPecho,


    "Prensa de piernas":
    prensaPiernas


};







function Maquinas(){



    const [

        maquinas,

        setMaquinas

    ] = useState<Maquina[]>([]);







    useEffect(()=>{


        const cargar = async()=>{


            try{


                const datos =

                await obtenerMaquinas();



                setMaquinas(datos);



            }catch(error){


                console.error(

                    "Error cargando máquinas",

                    error

                );


            }



        };



        cargar();



    },[]);










    return(



        <div>




            <h1

            style={{

                color:"#39ff14",

                fontSize:"35px"

            }}

            >

                ⚙️ Máquinas del gimnasio

            </h1>







            <div

            style={{

                display:"grid",

                gridTemplateColumns:

                "repeat(auto-fit,minmax(280px,1fr))",

                gap:"25px"


            }}

            >






            {

            maquinas.map(

                (maquina,index)=>(


                <div


                key={index}


                style={{


                    background:"#111",

                    border:"1px solid #39ff14",

                    borderRadius:"15px",

                    padding:"20px"


                }}


                >





                {

                imagenes[maquina.nombre] &&



                <img


                src={imagenes[maquina.nombre]}


                alt={maquina.nombre}


                style={{


                    width:"100%",


                    height:"200px",


                    objectFit:"cover",


                    borderRadius:"12px"


                }}


                />


                }





                <h2>

                    ⚙️ {maquina.nombre}

                </h2>





                <p>

                Tipo:

                {" "}

                {maquina.tipo}

                </p>





                <p>

                💪 Grupo muscular:

                {" "}

                {maquina.grupo_muscular}

                </p>





                <p>

                {maquina.descripcion}

                </p>





                <p>

                Estado:

                {" "}

                <span

                style={{

                    color:"#39ff14",

                    fontWeight:"bold"

                }}

                >

                {maquina.estado}

                </span>

                </p>






                <p

                style={{

                    color:"#39ff14"

                }}

                >

                🔄 Alternativas:

                {" "}

                {maquina.alternativas}

                </p>






                </div>


                )


            )

            }





            </div>






        </div>


    );


}



export default Maquinas;