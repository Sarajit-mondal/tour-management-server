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

// get all division 
const getAllDivision =catchAsync(async(req:Request,res:Response)=>{
  const result =await DivistionService.getAllDivision()
   sendResponse(res, {
        statusCode: 200,
        success: true,
        message: " get All Divisions successfully",
        data: result.data,
        meta: result.meta
    });
})
// get One division 
const getOneDivision =catchAsync(async(req:Request,res:Response)=>{
  const result =await DivistionService.getOneDivision(req.params.id)
   sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division Deleted Successfully",
        data: result
    });
})
// get One division 
const deleteOneDivision =catchAsync(async(req:Request,res:Response)=>{
  const result =await DivistionService.deleteOneDivision(req.params.id)
   sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "get One Division Successfully",
        data: result
    });
})



export const DivisionController = {
    createDivision,
    updateDivision,
    getAllDivision,
    getOneDivision,
    deleteOneDivision
}