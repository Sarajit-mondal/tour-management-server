import AppError from "../../errorHelpers/AppEror";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.modle";
import httpStatusCode from "http-status-codes"
import bcrypt from "bcryptjs"
import { generateToken } from "../../utils/jwt";
import { envVabs } from "../../config/env";
import { createUserTokens } from "../../utils/userToken";

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
const {password : pass ,...rest} = isUserExist.toObject()
return{
  
 accessToken,
 refreshToken,
 user : rest
}
}




export const AuthService = {
    credentialsLogin
}