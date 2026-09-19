import {
    useAuth
} from "../context/AuthContext";


import UserCard from "../components/UserCard";
import PerfilFisicoCard from "../components/PerfilFisicoCard";
import ObjetivoCard from "../components/ObjetivoCard";
import RutinaCard from "../components/RutinaCard";
import DetalleRutinaCard from "../components/DetalleRutinaCard";

function Dashboard(){


    const {
        cerrarSesion
    } = useAuth();



    return (

        <div>


            <h1>
                Dashboard RAG Gym
            </h1>



            <UserCard />
            <PerfilFisicoCard />
            <ObjetivoCard />
            <RutinaCard />
            <DetalleRutinaCard />

            <button
                onClick={cerrarSesion}
            >

                Cerrar sesión

            </button>



        </div>

    );

}


export default Dashboard;