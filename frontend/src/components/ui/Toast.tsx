import type {
    CSSProperties
} from "react";


interface Props{

    mensaje:string;

    tipo:"error" | "success";

}



function Toast({mensaje,tipo}:Props){


    return(

        <div style={toastStyle}>


            <div

            style={{

                color:
                tipo==="error"
                ?
                "white"
                :
                "black"

            }}

            >

                {mensaje}

            </div>



            <div style={barContainer}>

                <div style={barProgress}></div>

            </div>



        </div>

    );

}



const toastStyle:CSSProperties={


    position:"fixed",

    top:"25px",

    right:"25px",

    minWidth:"300px",

    background:"#111",

    border:

    "1px solid #39ff14",

    borderRadius:"12px",

    padding:"15px 20px",

    fontWeight:"bold",

    zIndex:9999,

    overflow:"hidden",

    boxShadow:

    "0 0 20px rgba(57,255,20,0.3)"


};




const barContainer:CSSProperties={


    position:"absolute",

    bottom:0,

    left:0,

    width:"100%",

    height:"4px",

    background:"#333"


};




const barProgress:CSSProperties={


    height:"100%",

    background:"white",

    animation:"countdown 7s linear forwards"


};



export default Toast;