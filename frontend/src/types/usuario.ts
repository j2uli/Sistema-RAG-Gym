export interface Usuario {


    _id?:string;


    nombre:string;


    apellido:string;


    correo:string;


    rol:string;


    password?:string;


    membresia?:{


        estado:string;


        plan:string;


        fecha_inicio:string;


        fecha_fin:string;


    };


}