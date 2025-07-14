/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

import httpStatus from "http-status-codes"
import { setAuthCooke } from "../../utils/setCookies";

const credentialsLogin = async(req:Request,res:Response,next:NextFunction)=>{
 const loginInfo = await AuthService.credentialsLogin(req.body)

 setAuthCooke(res,loginInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: loginInfo,
    })
}


export const AuthControllers ={
    credentialsLogin
}