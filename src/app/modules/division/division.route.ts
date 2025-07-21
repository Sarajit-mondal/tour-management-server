import { Router } from "express"
import { validateRequest } from "../../middlewares/validateRequest"
import { updateDivisionSchema } from "./division.validation"
import { DivisionController } from "./division.controller"


const router = Router()

router.post('/create',validateRequest(updateDivisionSchema),DivisionController.createDivision)
router.patch("/:id",validateRequest(updateDivisionSchema),DivisionController.updateDivision)



export const DivitionRoute = router