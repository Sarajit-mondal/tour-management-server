import { email } from "zod";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./jwt";
import { envVabs } from "../config/env";




export const createUserTokens = (user:Partial<IUser>)=>{
const jwtPayload = {
    userId : user._id,
    email : user.email,
    role: user.role
}


const accessToken = generateToken(jwtPayload,envVabs.JWT_ACCESS_SECRET,envVabs.JWT_ACCESS_EXPIRES)
const refreshToken = generateToken(jwtPayload,envVabs.JWT_REFRESH_SECRET,envVabs.JWT_REFRESH_EXPIRES)


return {
    accessToken,
    refreshToken
}


}