import Admin from "./pages/Admin"

import CartPage from "./pages/Cart"
import ProductPage from "./pages/ProductPage"
import Shop from "./pages/Shop"
import MainPage from "./pages/MainPage"
import AboutUs from "./pages/AboutUs"
import Service from "./pages/Service"
import Gallery from "./pages/Gallery"

import { PAYMENT_ROUTE, ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, MAINPAGE_ROUTE,ABOUTUS_ROUTE,SERVICE_ROUTE, GALLERY_ROUTE, INDIVIDUAL_ORDER_ROUTE, THANKYOU_ROUTE, PRIVACY_POLICY_ROUTE} from "./utils/consts"
import IndividualOrder from "./pages/IndividualOrder"
import Auth from "./components/Auth"
import SignUp from "./components/SignUp"
import PaymentPage from "./pages/PaymentPage"
import ThankYouPage from "./pages/ThankYouPage"
import PrivacyPolicy from "./pages/PrivacyPolicy"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CART_ROUTE,
        Component: CartPage
    },
    {
        path: PAYMENT_ROUTE,
        Component: PaymentPage
    },
    {
        path: THANKYOU_ROUTE,
        Component: ThankYouPage
    }

]

export const publicRoutes = [
    {
        path: MAINPAGE_ROUTE,
        Component: MainPage
    },
    {
        path: ABOUTUS_ROUTE,
        Component: AboutUs
    },
    {
        path: SERVICE_ROUTE,
        Component: Service
    },
    {
        path: GALLERY_ROUTE,
        Component: Gallery
    },
{
    path: SHOP_ROUTE,
    Component: Shop
},
{
    path: LOGIN_ROUTE,
    Component: Auth
},
{
    path: REGISTRATION_ROUTE,
    Component: SignUp
},
{
    path: PRODUCT_ROUTE + '/:id',
    Component: ProductPage
},
{
    path: INDIVIDUAL_ORDER_ROUTE,
    Component: IndividualOrder
},
{
    path: PRIVACY_POLICY_ROUTE,
    Component: PrivacyPolicy
}

]