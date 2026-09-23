interface ButtonProps {


    texto:string;


    tipo?:
    "guardar" |
    "cancelar" |
    "eliminar";


    onClick:()=>void;


    disabled?:boolean;


}




function Button({


    texto,


    tipo="guardar",


    onClick,


    disabled=false



}:ButtonProps){






    const estilos = {


        guardar:{


            background:"#39ff14",

            color:"#050505"


        },



        cancelar:{


            background:"#333",

            color:"white"


        },



        eliminar:{


            background:"#ff3333",

            color:"white"


        }



    };








    return(



        <button



        onClick={onClick}



        disabled={disabled}



        style={{



            ...estilos[tipo],



            border:"none",


            padding:"12px 28px",


            borderRadius:"12px",


            fontSize:"15px",


            fontWeight:"bold",


            cursor:

            disabled

            ?

            "not-allowed"

            :

            "pointer",



            transition:"0.3s",


            margin:"5px"



        }}



        >



            {texto}



        </button>



    );


}




export default Button;