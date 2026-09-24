import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import type {
    Usuario
} from "../types/usuario";

import {
    obtenerUsuarios,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
    actualizarMembresia
} from "../services/usuarioService";

import UserTable from "../components/users/UserTable";

import UserModal from "../components/users/UserModal";

import MembershipModal from "../components/users/MembershipModal";

import ConfirmModal from "../components/users/ConfirmModal";



function Usuarios(){



    const navigate = useNavigate();




    const [

        usuarios,

        setUsuarios

    ] = useState<Usuario[]>([]);






    const [

        usuariosFiltrados,

        setUsuariosFiltrados

    ] = useState<Usuario[]>([]);





    const [

        buscar,

        setBuscar

    ] = useState("");





    const [

        filtroRol,

        setFiltroRol

    ] = useState("Todos");





    const [

        filtroEstado,

        setFiltroEstado

    ] = useState("Todos");






    const [

        modalUsuario,

        setModalUsuario

    ] = useState(false);





    const [

        usuarioEditar,

        setUsuarioEditar

    ] = useState<Usuario|null>(null);







    const [

        modalMembresia,

        setModalMembresia

    ] = useState(false);






    const [

        usuarioMembresia,

        setUsuarioMembresia

    ] = useState<Usuario|null>(null);






    const [

        modalEliminar,

        setModalEliminar

    ] = useState(false);






    const [

        usuarioEliminar,

        setUsuarioEliminar

    ] = useState<string|null>(null);









    const cargarUsuarios = async()=>{


        const datos = await obtenerUsuarios();


        setUsuarios(datos);


        setUsuariosFiltrados(datos);



    };






    useEffect(()=>{


        cargarUsuarios();


    },[]);










    useEffect(()=>{


        let resultado = [...usuarios];



        if(buscar){


            resultado = resultado.filter(

                usuario =>

                `${usuario.nombre} ${usuario.apellido}`

                .toLowerCase()

                .includes(

                    buscar.toLowerCase()

                )

                ||

                usuario.correo

                .toLowerCase()

                .includes(

                    buscar.toLowerCase()

                )


            );


        }






        if(filtroRol !== "Todos"){


            resultado = resultado.filter(

                usuario =>

                usuario.rol === filtroRol

            );


        }






        if(filtroEstado !== "Todos"){


            resultado = resultado.filter(

                usuario =>

                usuario.membresia?.estado === filtroEstado

            );


        }





        setUsuariosFiltrados(resultado);



    },[buscar,filtroRol,filtroEstado,usuarios]);











    const guardarUsuario = async(usuario:any)=>{


        if(usuarioEditar){


           await editarUsuario(
            usuarioEditar._id,
            usuario
            );

        }else{


            await crearUsuario(usuario);


        }



        setModalUsuario(false);

        setUsuarioEditar(null);


        cargarUsuarios();


    };








    const eliminar = async()=>{


        if(usuarioEliminar){


            await eliminarUsuario(

                usuarioEliminar

            );


            setModalEliminar(false);


            setUsuarioEliminar(null);


            cargarUsuarios();


        }


    };









    const guardarMembresia = async(

        id:string,

        membresia:any

    )=>{


        await actualizarMembresia(

            id,

            membresia

        );


        setModalMembresia(false);


        setUsuarioMembresia(null);


        cargarUsuarios();



    };









    return(



        <div>



            <h1

            style={{

                color:"#39ff14",

                fontSize:"35px"

            }}

            >

                👥 Gestión de usuarios

            </h1>







            <div

            style={{

                display:"flex",

                gap:"20px",

                margin:"25px 0"

            }}

            >




                <div style={statStyle}>

                    👥 Total

                    <br/>

                    {usuarios.length}

                </div>




                <div style={statStyle}>

                    🟢 Activos

                    <br/>

                    {
                    usuarios.filter(

                    u=>u.membresia?.estado==="Activo"

                    ).length

                    }

                </div>




                <div style={statStyle}>

                    👑 Admin

                    <br/>

                    {
                    usuarios.filter(

                    u=>u.rol==="admin"

                    ).length

                    }

                </div>



            </div>









            <button

            onClick={()=>{

                setUsuarioEditar(null);

                setModalUsuario(true);

            }}

            style={buttonStyle}

            >

            ➕ Nuevo usuario

            </button>








            <input

            placeholder="🔎 Buscar usuario..."

            value={buscar}

            onChange={e=>setBuscar(e.target.value)}

            style={inputStyle}

            />







            <select

            value={filtroRol}

            onChange={e=>setFiltroRol(e.target.value)}

            style={inputStyle}

            >

                <option>

                    Todos

                </option>


                <option value="usuario">

                    Usuarios

                </option>


                <option value="admin">

                    Administradores

                </option>


            </select>







            <select

            value={filtroEstado}

            onChange={e=>setFiltroEstado(e.target.value)}

            style={inputStyle}

            >

                <option>

                    Todos

                </option>


                <option value="Activo">

                    Activos

                </option>


                <option value="Vencido">

                    Vencidos

                </option>


            </select>










            <UserTable


            usuarios={usuariosFiltrados}


            onVer={(id)=>{

                navigate(

                    `/usuarios/${id}`

                );

            }}



            onEditar={(usuario)=>{

                setUsuarioEditar(usuario);

                setModalUsuario(true);

            }}



            onEliminar={(id)=>{

                setUsuarioEliminar(id);

                setModalEliminar(true);

            }}



            onMembresia={(usuario)=>{

                setUsuarioMembresia(usuario);

                setModalMembresia(true);

            }}



            />









            <UserModal


            abierto={modalUsuario}


            cerrar={()=>setModalUsuario(false)}


            guardar={guardarUsuario}


            usuarioEditar={usuarioEditar}


            />








            <MembershipModal


            abierto={modalMembresia}


            cerrar={()=>setModalMembresia(false)}


            guardar={guardarMembresia}


            usuario={usuarioMembresia}


            />









            <ConfirmModal


            abierto={modalEliminar}


            cerrar={()=>setModalEliminar(false)}


            confirmar={eliminar}


            mensaje="¿Desea eliminar este usuario?"


            />





        </div>



    );



}








const statStyle: React.CSSProperties = {
    
    background:"#111",

    border:"1px solid #39ff14",

    padding:"20px",

    borderRadius:"15px",

    minWidth:"150px",

    textAlign:"center"

};




const inputStyle={

    background:"#111",

    color:"white",

    border:"1px solid #39ff14",

    padding:"10px",

    borderRadius:"10px",

    margin:"10px"

};



const buttonStyle={

    background:"#39ff14",

    border:"none",

    padding:"12px 25px",

    borderRadius:"10px",

    fontWeight:"bold",

    cursor:"pointer"

};




export default Usuarios;