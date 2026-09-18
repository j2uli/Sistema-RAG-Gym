import {
    useAuth
} from "../context/AuthContext";



function UserCard(){


    const {
        usuario
    } = useAuth();



    return (

        <div>


            <h3>
                Usuario
            </h3>



            <p>

                Nombre:
                {" "}
                {usuario?.nombre}

            </p>



            <p>

                Rol:
                {" "}
                {usuario?.rol}

            </p>


        </div>

    );

}


export default UserCard;