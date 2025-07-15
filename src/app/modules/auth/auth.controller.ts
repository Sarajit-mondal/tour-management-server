/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

import httpStatus from "http-status-codes"
import { setAuthCooke } from "../../utils/setCookies";
import AppError from "../../errorHelpers/AppEror";
import { catchAsync } from "../../utils/catchAsync";

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialsLogin(req.body)

   

     setAuthCooke(res, loginInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: loginInfo,
    })
})
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No refresh token recieved from cookies")
    }
    const tokenInfo = await AuthService.getNewAccessToken(refreshToken as string)

    setAuthCooke(res, tokenInfo);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo,
    })
})
const logOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    res.clearCookie('accessToken',{
        httpOnly:true,
        secure: false,
        sameSite: "lax"
    })
    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure: true,
        sameSite: "lax"
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "LogOut successfully",
        data: null,
    })
})

// changePassword
const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 const {oldPassword,newPassword}= req.body
 const dicodedToken = req.user

 await AuthService.resetPassword(oldPassword,newPassword,dicodedToken)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Changed successfully",
        data: null,
    })
})


export const AuthControllers ={
    credentialsLogin,
    getNewAccessToken,
    logOut,
    resetPassword
}