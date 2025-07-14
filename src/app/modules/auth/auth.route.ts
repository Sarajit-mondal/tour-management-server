import { Router } from "express";
import { AuthControllers } from "./auth.controller";


const router = Router()


router.post("/login",AuthControllers.credentialsLogin)
router.post("/refresh-token",AuthControllers.getNewAccessToken)
router.post("/log-out",AuthControllers.logOut)


export const AuthRoutes = router