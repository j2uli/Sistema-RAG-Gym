import type {
    Usuario
} from "../../types/usuario";



interface Props{


    usuarios:Usuario[];


    onVer:(id:string)=>void;


    onEditar:(usuario:Usuario)=>void;


    onEliminar:(id:string)=>void;


    onMembresia:(usuario:Usuario)=>void;


}






function UserTable({


    usuarios,


    onVer,


    onEditar,


    onEliminar,


    onMembresia



}:Props){





    return(



        <div

        style={{

            overflowX:"auto",

            background:"#0b0b0b",

            borderRadius:"15px",

            padding:"10px",

            border:"1px solid #222"

        }}

        >





            <table

            style={{


                width:"100%",


                borderCollapse:"separate",


                borderSpacing:"0 10px",


                color:"white"


            }}

            >





                <thead>


                    <tr

                    style={{

                        color:"#39ff14",

                        fontSize:"16px"

                    }}

                    >



                        <th style={headerStyle}>
                            Usuario
                        </th>



                        <th style={headerStyle}>
                            Correo
                        </th>



                        <th style={headerStyle}>
                            Rol
                        </th>



                        <th style={headerStyle}>
                            Membresía
                        </th>



                        <th style={headerStyle}>
                            Acciones
                        </th>



                    </tr>



                </thead>







                <tbody>


                {


                usuarios.map(usuario=>(



                    <tr

                    key={usuario._id}

                    style={{

                        background:"#151515",

                        borderRadius:"12px"

                    }}

                    >





                        <td style={cellStyle}>


                            <div

                            style={{

                                fontWeight:"bold",

                                fontSize:"16px"

                            }}

                            >

                            👤 {usuario.nombre}

                            {" "}

                            {usuario.apellido}

                            </div>


                        </td>







                        <td style={cellStyle}>


                            📧 {usuario.correo}


                        </td>







                        <td style={cellStyle}>


                            <span

                            style={{

                                background:

                                usuario.rol==="admin"

                                ?

                                "#5b21b6"

                                :

                                "#222",

                                padding:"6px 12px",

                                borderRadius:"20px",

                                fontSize:"13px"

                            }}

                            >

                            {usuario.rol}

                            </span>


                        </td>









                        <td style={cellStyle}>


                        {

                        usuario.membresia?.estado==="Activo"


                        ?


                        <div>


                            <span

                            style={{

                                color:"#39ff14",

                                fontWeight:"bold"

                            }}

                            >

                            🟢 Activo

                            </span>


                            {

                            usuario.membresia.plan &&

                            <div

                            style={{

                                fontSize:"12px",

                                color:"#aaa",

                                marginTop:"5px"

                            }}

                            >

                            {usuario.membresia.plan}

                            </div>

                            }



                        </div>



                        :



                        <span

                        style={{

                            color:"#ff5555",

                            fontWeight:"bold"

                        }}

                        >

                        🔴 Inactivo

                        </span>


                        }



                        </td>









                        <td style={cellStyle}>


                            <div

                            style={{

                                display:"flex",

                                justifyContent:"center",

                                gap:"8px"

                            }}

                            >





                            <ActionButton

                            color="#2563eb"

                            onClick={()=>onVer(usuario._id)}

                            >

                            👁

                            </ActionButton>






                            <ActionButton

                            color="#f59e0b"

                            onClick={()=>onEditar(usuario)}

                            >

                            ✏️

                            </ActionButton>







                            <ActionButton

                            color="#16a34a"

                            onClick={()=>onMembresia(usuario)}

                            >

                            💳

                            </ActionButton>







                            <ActionButton

                            color="#dc2626"

                            onClick={()=>onEliminar(usuario._id)}

                            >

                            🗑

                            </ActionButton>





                            </div>


                        </td>






                    </tr>


                ))


                }



                </tbody>





            </table>



        </div>


    );


}







const headerStyle:React.CSSProperties={


    padding:"15px",

    textAlign:"center"


};





const cellStyle:React.CSSProperties={


    padding:"15px",

    textAlign:"center",

    borderBottom:"1px solid #222"


};







function ActionButton({


    children,


    onClick,


    color



}:any){


    return(


        <button


        onClick={onClick}


        style={{


            background:color,

            border:"none",

            color:"white",

            width:"35px",

            height:"35px",

            borderRadius:"8px",

            cursor:"pointer",

            fontSize:"16px",

            transition:"0.2s"

        }}

        >


            {children}


        </button>


    );


}







export default UserTable;