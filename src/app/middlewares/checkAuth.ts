import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppEror";
import { verifyToken } from "../utils/jwt";
import { envVabs } from "../config/env";
import { JwtPayload } from "jsonwebtoken";


export const checkAuth = (...authRoles : string[]) => (req:Request,res:Response,next:NextFunction)=>{
 try {
    const accessToken = req.headers.authorization;
    if(!accessToken){
        throw new AppError(403,"No Token Recieved")
    }

const verifiedToken = verifyToken(accessToken,envVabs.JWT_ACCESS_SECRET) as JwtPayload

if(!authRoles.includes(verifiedToken.role)){
    throw new AppError(403,"You are not permitted to view this route!!")
}

req.user = verifiedToken
next()

 } catch (error) {
    next(error)
 }
}