import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

export default function ProtectedRoutes() {
    const { isAuth } = useSelector((state) => state.userReducer);
    console.log("Inside protected route. isAuth -->", isAuth);

    if(!isAuth) {
        return <Navigate to="/login" replace />;
    } else {
        return <Outlet />;
    }
}