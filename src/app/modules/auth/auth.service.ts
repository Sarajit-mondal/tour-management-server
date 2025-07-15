/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppEror";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.modle";
import httpStatusCode from "http-status-codes"
import bcrypt from "bcryptjs"
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userToken";
import { JwtPayload } from "jsonwebtoken";
import { envVabs } from "../../config/env";

const credentialsLogin = async(payload:Partial<IUser>)=>{
const {email,password} = payload;

const isUserExist = await User.findOne({email})

if(!isUserExist){
 throw new AppError(httpStatusCode.BAD_REQUEST,"Email does not exist")
}

const isPasswordMatched = await bcrypt.compare(password as string,isUserExist.password as string)

if(!isPasswordMatched){
    throw new AppError(httpStatusCode.BAD_REQUEST,"Incorrect Password")
}



const jwtToken = createUserTokens(isUserExist)
const accessToken = jwtToken.accessToken
const refreshToken = jwtToken.refreshToken
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {password : pass ,...rest} = isUserExist.toObject()
return{
  
 accessToken,
 refreshToken,
 user : rest
}
}


const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }

}


///reset password
const resetPassword =async(oldPassword:string,newPassword:string,dicodedToken:JwtPayload)=>{
const user = await User.findOne({email : dicodedToken.email})

const isOldPassword = await bcrypt.compare(oldPassword,user!.password as string)
if(!isOldPassword){
     throw new AppError(httpStatusCode.UNAUTHORIZED,"Old Password does not match")
}
user!.password = await bcrypt.hash(newPassword,Number(envVabs.BCRYPT_SALT_ROUND))

user!.save()

}


export const AuthService = {
    credentialsLogin,
    getNewAccessToken,
    resetPassword
}