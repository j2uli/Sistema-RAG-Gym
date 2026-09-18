import {
    useAuth
} from "../context/AuthContext";


import UserCard from "../components/UserCard";



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



            <button
                onClick={cerrarSesion}
            >

                Cerrar sesión

            </button>



        </div>

    );

}


export default Dashboard;