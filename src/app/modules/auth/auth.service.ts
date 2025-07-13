import AppError from "../../errorHelpers/AppEror";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.modle";
import httpStatusCode from "http-status-codes"
import bcrypt from "bcryptjs"
import { generateToken } from "../../utils/jwt";
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

// jwt payload
const jwtPayload = {
    userId : isUserExist?._id,
    email : isUserExist?.email,
    role : isUserExist?.role
}

const jwtToken = generateToken(jwtPayload,envVabs.JWT_ACCESS_SECRET,envVabs.JWT_ACCESS_EXPIRES)
// eslint-disable-next-line no-console
console.log(jwtToken)
return{
   jwtToken
}
}




export const AuthService = {
    credentialsLogin
}