interface Props {

    titulo:string;

    valor:string;

    icono:string;

}



function StatCard({
    titulo,
    valor,
    icono
}:Props){


    return (

        <div

        style={{

            background:"#111",

            border:
            "1px solid #39ff14",

            borderRadius:"15px",

            padding:"20px",

            width:"220px",

            boxShadow:
            "0 0 15px rgba(57,255,20,0.3)"

        }}

        >


            <h3>

                {icono} {titulo}

            </h3>


            <h2

            style={{

                color:"#39ff14"

            }}

            >

                {valor}

            </h2>


        </div>

    );


}


export default StatCard;