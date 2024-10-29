import { lazy } from "react";

export const PrivateRoutes = [

    
    {
        name: "Dashboard",
        path: "/dashboard",
        component: lazy(() => import("../pages/Dashboard/Dashboard"))
    },
    {
        name: "Adduser",
        path: "/adduser",
        component:lazy(()=>import ("../pages/AddUser/Adduser"))
    },
    {
        name: "Settings",
        path: "/settings",
        component: lazy(() => import("../pages/Settings/Settings"))
    },
    {
        name: "edituser",
        path: "/edit/:id",
        component: lazy(() => import("../pages/AddUser/Adduser"))
    },
    {
        name: "pagenotfound",
        path: "*",
        component: lazy(() => import("../Components/PageNotFound"))
    }
   

]

