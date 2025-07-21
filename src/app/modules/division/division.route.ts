import { Router } from "express"
import { validateRequest } from "../../middlewares/validateRequest"
import { updateDivisionSchema } from "./division.validation"
import { DivisionController } from "./division.controller"
import { checkAuth } from "../../middlewares/checkAuth"
import { Role } from "../user/user.interface"


const router = Router()

router.post('/create',
    validateRequest(updateDivisionSchema),
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    DivisionController.createDivision)
router.patch("/:id",
    validateRequest(updateDivisionSchema),
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    DivisionController.updateDivision)
router.get("/", DivisionController.getAllDivision)
router.get("/:id", DivisionController.getOneDivision)
router.delete("/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN)
    , DivisionController.deleteOneDivision)



export const DivitionRoute = router