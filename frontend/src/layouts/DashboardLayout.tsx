import {
    Outlet,
    NavLink
} from "react-router-dom";


import logo from "../assets/logo.png";



function DashboardLayout(){


    return (


        <div

        style={{

            minHeight:"100vh",

            background:"#050505",

            color:"white",

            display:"flex"

        }}

        >



            {/* SIDEBAR */}

            <aside

            style={{

                width:"260px",

                background:
                "linear-gradient(180deg,#111,#050505)",

                padding:"25px",

                borderRight:
                "1px solid #39ff14",

                boxShadow:
                "5px 0 20px rgba(57,255,20,0.15)"

            }}

            >



                <div

                style={{

                    textAlign:"center",

                    marginBottom:"40px"

                }}

                >


                    <img

                    src={logo}

                    alt="Mítico Fitness"

                    style={{

                        width:"170px"

                    }}

                    />



                    <p

                    style={{

                        color:"#39ff14",

                        fontSize:"13px",

                        marginTop:"10px"

                    }}

                    >

                    Panel Administrativo

                    </p>


                </div>





                <nav

                style={{

                    display:"flex",

                    flexDirection:"column",

                    gap:"12px"

                }}

                >



                    <MenuItem

                    to="/dashboard"

                    texto="Dashboard"

                    icono="🏠"

                    />



                    <MenuItem

                    to="/usuarios"

                    texto="Usuarios"

                    icono="👥"

                    />



                    <MenuItem

                    to="/perfil"

                    texto="Perfiles físicos"

                    icono="💪"

                    />



                    <MenuItem

                    to="/objetivos"

                    texto="Objetivos"

                    icono="🎯"

                    />



                    <MenuItem

                    to="/ejercicios"

                    texto="Ejercicios"

                    icono="🏋️"

                    />



                    <MenuItem

                    to="/maquinas"

                    texto="Máquinas"

                    icono="⚙️"

                    />



                    <MenuItem

                    to="/rutinas"

                    texto="Rutinas"

                    icono="🔥"

                    />



                    <MenuItem

                    to="/progreso"

                    texto="Progreso"

                    icono="📈"

                    />



                </nav>




            </aside>







            <main

            style={{

                flex:1,

                padding:"35px",

                background:"#050505"

            }}

            >


                <Outlet />


            </main>




        </div>


    );


}






function MenuItem({

    to,

    texto,

    icono

}:{

    to:string;

    texto:string;

    icono:string;

}){


    return (


        <NavLink

        to={to}


        style={({isActive})=>({


            display:"flex",

            alignItems:"center",

            gap:"12px",

            padding:"12px 15px",

            borderRadius:"10px",

            textDecoration:"none",

            color:

            isActive

            ? "#050505"

            : "#39ff14",


            background:

            isActive

            ? "#39ff14"

            : "transparent",


            fontWeight:"bold",

            transition:"0.3s"


        })}

        >


            <span>

                {icono}

            </span>


            {texto}


        </NavLink>


    );


}



export default DashboardLayout;