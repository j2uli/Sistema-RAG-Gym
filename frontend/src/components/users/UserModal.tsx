import {
    useEffect,
    useState
} from "react";


import Button from "../ui/Button";



interface Usuario{


    _id?:string;

    nombre:string;

    apellido:string;

    correo:string;

    password?:string;

    rol:string;


}



interface Props{


    abierto:boolean;


    cerrar:()=>void;


    guardar:(usuario:Usuario)=>void;


    usuarioEditar?:Usuario | null;


}




function UserModal({


    abierto,

    cerrar,

    guardar,

    usuarioEditar


}:Props){





    const [

        usuario,

        setUsuario

    ] = useState<Usuario>({


        nombre:"",

        apellido:"",

        correo:"",

        password:"",

        rol:"usuario"


    });







    useEffect(()=>{


        if(usuarioEditar){


            setUsuario(usuarioEditar);


        }else{


            setUsuario({


                nombre:"",

                apellido:"",

                correo:"",

                password:"",

                rol:"usuario"


            });


        }


    },[usuarioEditar]);







    if(!abierto){

        return null;

    }







    const cambiar = (

        e:React.ChangeEvent<

        HTMLInputElement |

        HTMLSelectElement>

    )=>{


        setUsuario({


            ...usuario,


            [e.target.name]:

            e.target.value


        });


    };








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


            zIndex:1000


        }}

        >





            <div


            style={{


                background:"#111",


                border:"1px solid #39ff14",


                borderRadius:"18px",


                padding:"35px",


                width:"420px",


                boxShadow:

                "0 0 25px rgba(57,255,20,0.2)"


            }}


            >





                <h2

                style={{


                    color:"#39ff14",

                    marginBottom:"20px"


                }}

                >


                {

                usuarioEditar

                ?

                "✏️ Editar usuario"

                :

                "➕ Nuevo usuario"


                }


                </h2>







                <input

                name="nombre"

                placeholder="Nombre"

                value={usuario.nombre}

                onChange={cambiar}

                style={inputStyle}

                />






                <input

                name="apellido"

                placeholder="Apellido"

                value={usuario.apellido}

                onChange={cambiar}

                style={inputStyle}

                />







                <input

                name="correo"

                placeholder="Correo"

                value={usuario.correo}

                onChange={cambiar}

                style={inputStyle}

                />








                {

                !usuarioEditar &&


                <input

                name="password"

                type="password"

                placeholder="Contraseña"

                value={usuario.password}

                onChange={cambiar}

                style={inputStyle}

                />

                }








                <select

                name="rol"

                value={usuario.rol}

                onChange={cambiar}

                style={inputStyle}

                >


                    <option value="usuario">

                        Usuario

                    </option>


                    <option value="admin">

                        Administrador

                    </option>


                </select>








                <div

                style={{


                    display:"flex",


                    justifyContent:"flex-end",


                    gap:"15px",


                    marginTop:"25px"


                }}

                >





                    <Button

                    texto="Cancelar"

                    tipo="cancelar"

                    onClick={cerrar}

                    />






                    <Button

                    texto="Guardar"

                    tipo="guardar"

                    onClick={()=>guardar(usuario)}

                    />






                </div>







            </div>





        </div>



    );


}









const inputStyle:React.CSSProperties={


    width:"100%",


    padding:"12px",


    marginTop:"12px",


    background:"#050505",


    color:"white",


    border:"1px solid #333",


    borderRadius:"10px",


    fontSize:"14px"


};







export default UserModal;