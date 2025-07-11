import { Request, Response } from "express";
import { UserService } from "./user.service";



// createUser 
const createUser = async(req:Request,res:Response)=>{

    try {
    const user = await UserService.createUser(req.body)
    res.send(user)
    } catch (error) {
        res.send(error)
    }
}


// getAll Users 
const getAllusers = async(req:Request,res:Response)=>{
   try {
    const users = await UserService.getAllUsers()
    res.send(users)
   } catch (error) {
    
   }
}


export const UserControllers = {
    createUser,
    getAllusers
}