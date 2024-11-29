import { Navigate, createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from './views/Layouts/DefaultLayout';
import { DashBoard } from './views/Layouts/DashBoard';
import { GuestLayout } from './views/Layouts/GuestLayout';
import { Login } from './views/Auth/Login';
import { NotFound } from './views/Layouts/NotFound';
import { FactibilidadDashBoard } from './views/Factibilidad/FactibilidadDashBoard';
import { CrearFactibilidad } from './views/Factibilidad/CrearFactibilidad';
import { FactibilidadFormulario } from './views/Factibilidad/FactibilidadFormulario';
import { VerFactibilidad } from './views/Factibilidad/VerFactibilidad';


const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/dashboard',
                element: <DashBoard />
            },
            {
                path: '/factibilidadDashboard',
                element: <FactibilidadDashBoard />
            },
            {
                path: '/crearFactibilidad',
                element: <CrearFactibilidad />
            },
            {
                path: '/factibilidadFormulario',
                element: <FactibilidadFormulario />
            },
            {
                path: '/factibilidadDashboard/verFactibilidad',
                element: <VerFactibilidad />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
])
export default router;
