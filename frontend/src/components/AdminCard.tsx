interface Props {

    titulo:string;

    valor:string;

    icono:string;

}



function AdminCard({
    titulo,
    valor,
    icono
}:Props){


    return (

        <div

        style={{

            background:"#111",

            border:"1px solid #39ff14",

            borderRadius:"15px",

            padding:"25px",

            minWidth:"220px",

            boxShadow:
            "0 0 15px rgba(57,255,20,0.15)"

        }}

        >


            <h3>

                {icono} {titulo}

            </h3>


            <h1

            style={{

                color:"#39ff14"

            }}

            >

                {valor}

            </h1>


        </div>

    );


}


export default AdminCard;