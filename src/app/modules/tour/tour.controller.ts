import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"

import httpStatus from "http-status-codes"
import { TourService } from "./tour.service"


const getAllTours = catchAsync(async(req:Request,res:Response)=>{

  const result = await TourService.getAllTours(req.query as Record<string,string>)
   
   sendResponse(res,{
    statusCode: httpStatus.CREATED,
    success:true,
    message: "User updated Successfull",
    data: result
   })
})

export const tourControler ={
    getAllTours
}