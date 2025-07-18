/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

import httpStatus from "http-status-codes"
import { setAuthCooke } from "../../utils/setCookies";
import AppError from "../../errorHelpers/AppEror";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { createUserTokens } from "../../utils/userToken";
import { envVabs } from "../../config/env";
import passport from "passport";

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passport.authenticate('local',async(err:any,user:any,info:any)=>{

        if(err){
            return next(new AppError(401,err))
        }

        if(!user){
            return next(new AppError(401,info.message))
        }

        const userToken = createUserTokens(user)
        setAuthCooke(res,userToken)

        const {password : pass,...rest} = user.toObject()
        sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: {
            accessToken: userToken.accessToken,
            resfresshToken: userToken.refreshToken,
            user:rest
        }
    })
    })(req,res,next)

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

 await AuthService.resetPassword(oldPassword,newPassword,dicodedToken as JwtPayload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Changed successfully",
        data: null,
    })
})
const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    let redirectTo = req.query.state ? req.query.state as string : ""

    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1)
    }

    // /booking => booking , => "/" => ""
    const user = req.user;

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }

    const tokenInfo = createUserTokens(user)

    setAuthCooke(res, tokenInfo)

    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "Password Changed Successfully",
    //     data: null,
    // })

    res.redirect(`${envVabs.FRONTEND_URL}/${redirectTo}`)
})

export const AuthControllers ={
    credentialsLogin,
    getNewAccessToken,
    logOut,
    resetPassword,
    googleCallbackController
}