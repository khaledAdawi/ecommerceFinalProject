import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Shop from "./pages/shop/Shop";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import ResetPassword from "./pages/login/ResetPassword";
import SendCode from "./pages/login/SendCode";
import ProtectedRouter from "./ProtectedRouter";
import ProductDetails from "./pages/product/ProductDetails";
import CheckOut from "./pages/checkout/Checkout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "home",
                element: <Home />
            },
            {
                path: 'cart',
                element:
                <ProtectedRouter>
                    <Cart />
                </ProtectedRouter>
            },
            {
                path: 'checkout',
                element:
                <ProtectedRouter>
                    <CheckOut />
                </ProtectedRouter>
            },
            {
                path: 'shop',
                element: <Shop />
            },
            {
                path: 'productDetails/:id',
                element: <ProductDetails />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'contact',
                element: <Contact />
            }, {
                path: 'login',
                element: <Login />
            },
            {
                path: 'sendCode',
                element: <SendCode />
            },
            {
                path: 'resetPassword',
                element: <ResetPassword />
            },
            {
                path: 'register',
                element: <Register />
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