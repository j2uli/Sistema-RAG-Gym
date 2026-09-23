import Button from "../ui/Button";

interface Props{


    abierto:boolean;

    cerrar:()=>void;

    confirmar:()=>void;

    mensaje:string;


}




function ConfirmModal({

    abierto,

    cerrar,

    confirmar,

    mensaje


}:Props){





    if(!abierto){

        return null;

    }







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

            justifyContent:"center",

            alignItems:"center",

            zIndex:3000


        }}

        >





            <div

            style={{


                background:"#111",

                border:"1px solid red",

                borderRadius:"15px",

                padding:"30px",

                width:"350px",

                textAlign:"center"


            }}

            >





                <h2

                style={{

                    color:"red"

                }}

                >

                ⚠️ Confirmar

                </h2>






                <p>

                {mensaje}

                </p>








                <div

                style={{

                    display:"flex",

                    justifyContent:"center",

                    gap:"20px",

                    marginTop:"25px"

                }}

                >



                   <Button

                        texto="Cancelar"

                        tipo="cancelar" 

                        onClick={cerrar}

                    />







                   <Button

texto="Eliminar"

tipo="eliminar"

onClick={confirmar}

/>



                </div>






            </div>





        </div>


    );


}



export default ConfirmModal;