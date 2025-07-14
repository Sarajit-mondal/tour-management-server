/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"



const createUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const user = await UserService.createUser(req.body)

   sendResponse(res,{
    statusCode: httpStatus.CREATED,
    success:true,
    message: "User Created Successfull",
    data: user,
   })
})

// updateUser
const updateUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const user = await UserService.updateUser(req.params.id,req.body,req.user)

   sendResponse(res,{
    statusCode: httpStatus.CREATED,
    success:true,
    message: "User updated Successfull",
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
    getAllusers,
    updateUser
}