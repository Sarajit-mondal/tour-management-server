import AppError from "../../errorHelpers/AppEror";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.modle";
import httpStatusCode from "http-status-codes"
import bcrypt from "bcryptjs"

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

return{
    email
}
}




export const AuthService = {
    credentialsLogin
}