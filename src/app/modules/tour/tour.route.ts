import { Router } from "express";
import { tourControler } from "./tour.controller";


const route = Router()

route.get("/",tourControler.getAllTours)


export const TourRoute = route