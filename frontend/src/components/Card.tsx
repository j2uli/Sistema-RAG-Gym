interface CardProps {

    titulo: string;

    children: React.ReactNode;

}



function Card({
    titulo,
    children
}: CardProps){


    return (

        <div>


            <h3>
                {titulo}
            </h3>


            <div>

                {children}

            </div>


        </div>

    );


}


export default Card;