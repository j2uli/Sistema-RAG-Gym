import {
    useEffect,
    useState
} from "react";

import type {
    Usuario
} from "../../types/usuario";

import Button from "../ui/Button";

interface Props{


    abierto:boolean;

    cerrar:()=>void;

    guardar:(id:string,membresia:any)=>void;

    usuario?:Usuario | null;


}





function MembershipModal({

    abierto,

    cerrar,

    guardar,

    usuario


}:Props){





    const [membresia,setMembresia] = useState({


        estado:"Activo",

        plan:"Mensual",

        fecha_inicio:"",

        fecha_fin:""


    });








    useEffect(()=>{


        if(usuario?.membresia){


            setMembresia({

                estado:
                usuario.membresia.estado || "Activo",


                plan:
                usuario.membresia.plan || "Mensual",


                fecha_inicio:
                usuario.membresia.fecha_inicio
                ?
                usuario.membresia.fecha_inicio.substring(0,10)
                :
                "",


                fecha_fin:
                usuario.membresia.fecha_fin
                ?
                usuario.membresia.fecha_fin.substring(0,10)
                :
                ""

            });


        }


    },[usuario]);








    if(!abierto || !usuario){

        return null;

    }








    const cambiar=(

        e:React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >

    )=>{


        setMembresia({

            ...membresia,

            [e.target.name]:e.target.value

        });


    };








    return(



        <div

        style={{

            position:"fixed",

            top:0,

            left:0,

            width:"100%",

            height:"100%",

            background:"rgba(0,0,0,0.75)",

            display:"flex",

            alignItems:"center",

            justifyContent:"center",

            zIndex:2000

        }}

        >





            <div

            style={{


                background:"#111",

                border:"1px solid #39ff14",

                borderRadius:"15px",

                padding:"30px",

                width:"420px"


            }}

            >





                <h2

                style={{

                    color:"#39ff14"

                }}

                >

                    💳 Membresía de {usuario.nombre}

                </h2>






                <label>

                    Estado

                </label>


                <select

                name="estado"

                value={membresia.estado}

                onChange={cambiar}

                style={inputStyle}

                >


                    <option value="Activo">

                        🟢 Activo

                    </option>


                    <option value="Vencido">

                        ⚠️ Vencido

                    </option>


                </select>









                <label>

                    Plan

                </label>


                <select

                name="plan"

                value={membresia.plan}

                onChange={cambiar}

                style={inputStyle}

                >


                    <option>

                        Mensual

                    </option>


                    <option>

                        Trimestral

                    </option>


                    <option>

                        Anual

                    </option>


                </select>








                <label>

                    Fecha inicio

                </label>


                <input

                type="date"

                name="fecha_inicio"

                value={membresia.fecha_inicio}

                onChange={cambiar}

                style={inputStyle}

                />








                <label>

                    Fecha fin

                </label>


                <input

                type="date"

                name="fecha_fin"

                value={membresia.fecha_fin}

                onChange={cambiar}

                style={inputStyle}

                />









                <div

                style={{

                    display:"flex",

                    gap:"15px",

                    marginTop:"25px"

                }}

                >



                 <Button

texto="Cancelar"

tipo="cancelar"

onClick={cerrar}

/>
<Button

texto="Guardar"

tipo="guardar"

onClick={()=>guardar(usuario._id,membresia)}
/>



       

                </div>






            </div>





        </div>



    );



}






const inputStyle={


    width:"100%",

    marginTop:"8px",

    marginBottom:"15px",

    padding:"10px",

    background:"#050505",

    color:"white",

    border:"1px solid #333",

    borderRadius:"8px"


};





export default MembershipModal;