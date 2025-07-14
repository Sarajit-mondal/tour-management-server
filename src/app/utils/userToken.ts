
import { IsActive, IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { envVabs } from "../config/env";
import { User } from "../modules/user/user.modle";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppEror";
import httpstatus from 'http-status-codes'



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
export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {

    const verifiedRefreshToken = verifyToken(refreshToken, envVabs.JWT_REFRESH_SECRET) as JwtPayload


    const isUserExist = await User.findOne({ email: verifiedRefreshToken.email })

    if (!isUserExist) {
        throw new AppError(httpstatus.BAD_REQUEST, "User does not exist")
    }
    if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
        throw new AppError(httpstatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
    }
    if (isUserExist.isDeleted) {
        throw new AppError(httpstatus.BAD_REQUEST, "User is deleted")
    }

    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }
    const accessToken = generateToken(jwtPayload, envVabs.JWT_ACCESS_SECRET, envVabs.JWT_ACCESS_EXPIRES)

    return accessToken
}