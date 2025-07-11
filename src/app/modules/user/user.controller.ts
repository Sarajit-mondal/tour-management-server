import { Request, Response } from "express";
import { UserService } from "./user.service";




const createUser = async(req:Request,res:Response)=>{

    try {
    const user = await UserService.createUser(req.body)
    res.send(user)
    } catch (error) {
        res.send(error)
    }
}



export const UserControllers = {
    createUser
}