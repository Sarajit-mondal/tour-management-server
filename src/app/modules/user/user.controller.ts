import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";



// createUser 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user = await UserService.createUser(req.body)

    res.status(200).json({
        data:user,
        message : "User created successfully"
    })
})


// getAll Users 
const getAllusers =catchAsync(async(req:Request,res:Response)=>{
    const users = await UserService.getAllUsers()
    res.status(200).json({
        data : users,
        message : "get All user successfully"
    })
   
})


export const UserControllers = {
    createUser,
    getAllusers
}