import { Request, Response } from "express";
import httpStatus from "http-status-codes";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (req:Request,res:Response)=>{
    res.status(httpStatus.NOT_FOUND).json({
        success:false,
        message: "Route Not Found"
    })
}



export default notFound;