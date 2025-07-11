import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"


// createUser 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user = await UserService.createUser(req.body)

   sendResponse(res,{
    statusCode: httpStatus.CREATED,
    success:true,
    message: "User Created Successfull",
    data: user,
   })
})


// getAll Users 
const getAllusers =catchAsync(async(req:Request,res:Response)=>{
    const users = await UserService.getAllUsers()
    sendResponse(res,{
    statusCode: httpStatus.CREATED,
    success:true,
    message: "All Users Retrieved Successfully",
    meta: users.meta,
    data: users,
   })
   
})


export const UserControllers = {
    createUser,
    getAllusers
}