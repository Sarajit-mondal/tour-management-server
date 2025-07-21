import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { DivistionService } from "./division.service"
import { sendResponse } from "../../utils/sendResponse"


// createDivistion 
const createDivision =catchAsync(async(req:Request,res:Response)=>{
  const result =await DivistionService.createDivision(req.body)
   sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Divisions Created",
        data: result
    });
})

// updateDivision
const updateDivision =catchAsync(async(req:Request,res:Response)=>{
 const result = await DivistionService.updateDivision(req.params.id,req.body)
   sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Divisions Updated successfully",
        data: result
    });
})



export const DivisionController = {
    createDivision,
    updateDivision
}