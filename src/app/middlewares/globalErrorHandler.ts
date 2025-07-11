import { NextFunction, Request, Response } from "express"
import { envVabs } from "../config/env"
import AppError from "../errorHelpers/AppEror";


// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err:any,req:Request,res:Response,next:NextFunction)=>{


  let statusCode = 500;
  let message = `Something Went Wron!! ${err.message}`


if(err instanceof AppError){
    statusCode = err.statusCode
    message = err.message
}else if(err instanceof Error){
    statusCode = 500
    message = err.message
}


  res.status(statusCode).json({
    success:false,
    message: message,
    err,
    stack: envVabs.NODE_ENV === "development"? err.stack : null
  })
}