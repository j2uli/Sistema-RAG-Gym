import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Perfil from "../pages/Perfil";
import Rutina from "../pages/Rutina";
import Progreso from "../pages/Progreso";
import Usuarios from "../pages/Usuarios";
import UsuarioDetalle from "../pages/UsuarioDetalle";

import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";



function AppRouter(){


    return (

        <BrowserRouter>


            <Routes>


                {/* LOGIN */}

                <Route

                    path="/login"

                    element={<Login />}

                />




                {/* ZONA PROTEGIDA */}

                <Route

                    element={<ProtectedRoute />}

                >



                    <Route

                        element={<DashboardLayout />}

                    >



                        <Route

                            path="/dashboard"

                            element={<Dashboard />}

                        />



                        <Route

                            path="/perfil"

                            element={<Perfil />}

                        />



                        <Route

                            path="/rutina"

                            element={<Rutina />}

                        />



                        <Route

                            path="/progreso"

                            element={<Progreso />}

                        />
                        <Route
                            path="/usuarios"
                             element={<Usuarios />}
                        />

                        <Route

                            path="/usuarios/:id"

                            element={<UsuarioDetalle />}

                        />



                    </Route>



                </Route>



            </Routes>


        </BrowserRouter>

    );


}


export default AppRouter;