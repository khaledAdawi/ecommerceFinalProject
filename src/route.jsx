import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Shop from "./pages/shop/Shop";
import About from "./pages/about/About";
import Contact from "./pages/Contact/Contact";

const router = createBrowserRouter([
    {
        path: "/",
        element:<MainLayout />,
        children: [
            {
                path:'home',
                element:<Home />
            },
            {
                path:'cart',
                element:<Cart />
            },
            {
                path:'shop',
                element:<Shop />
            },
            {
                path:'about',
                element:<About />
            },
            {
                path:'contact',
                element:<Contact />
            },{
                path:'login',
                element:<Login />
            },
            {
                path:'register',
                element:<Register />
            }
        ]
    },
    {

        path: '/auth',
        element: <AuthLayout />,
        children: [
            
        ]
    }
]);

export default router;