import { lazy } from "react";

export const PublicRoutes = [
    {
        name: "login",
        path: "/",
        component: lazy(() => import("../pages/Login/Login"))
    },
    {
        name: "register",
        path: "/register",
        component: lazy(() => import("../pages/Register/Register"))
    } ,
    {
        name: "pagenotfound",
        path: "*",
        component: lazy(() => import("../Components/PageNotFound"))
    }
]

