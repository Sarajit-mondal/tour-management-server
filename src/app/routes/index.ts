import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DivitionRoute } from "../modules/division/division.route";
import { TourRoute } from "../modules/tour/tour.route";
import { bookingRoute } from "../modules/payment/payment.route";


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
    {
        path:"/tour",
        route : TourRoute
    },
    {
        path:"/booking",
        route : bookingRoute
    },
]


moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})

