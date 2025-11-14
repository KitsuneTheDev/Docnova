import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

export default function PublicRoutes() {
    const { isAuth } = useSelector((state) => state.userReducer);
    console.log("Inside public route. isAuth -->", isAuth);

    if(isAuth) {
        return <Navigate to="/invoices" replace />
    } else {
        return <Outlet />
    }
};