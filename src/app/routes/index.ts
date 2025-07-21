import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DivitionRoute } from "../modules/division/division.route";


export const router = Router()

const moduleRoutes =[
    {
        path : "/user",
        route : UserRoutes
    },
    {
        path:"/auth",
        route : AuthRoutes
    },
    {
        path:"/division",
        route : DivitionRoute
    },
]


moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})

