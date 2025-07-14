import AppError from "../../errorHelpers/AppEror";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.modle"
import httpStatusCode from "http-status-codes"
import bcrypt from "bcryptjs";
import { envVabs } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
const createUser= async(payload:Partial<IUser>)=>{

        const {email,password, ...rest} = payload;
    
        // check This user email already exist or not
        const IsEmailExist = await User.findOne({email})
        if(IsEmailExist){
            throw new AppError(httpStatusCode.BAD_REQUEST,"User Already exist")
        }

    // password bcrypt
    const hashedPassword = bcrypt.hashSync(password as string,Number(envVabs.BCRYPT_SALT_ROUND))
 
    const authProvider : IAuthProvider = {provider : "credentials",providerId:email as string}


    const user = await User.create({
        email,
        password : hashedPassword,
        auths: [authProvider],
        ...rest
    })
    return user;
}


const updateUser =async(userId:string,payload:Partial<IUser>,decodedToken:JwtPayload)=>{

    const ifUserExist = await User.findById(userId);

    if (!ifUserExist) {
        throw new AppError(httpStatusCode.NOT_FOUND, "User Not Found")
    }

    /**
     * email - can not update
     * name, phone, password address
     * password - re hashing
     *  only admin superadmin - role, isDeleted...
     * 
     * promoting to superadmin - superadmin
     */

    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatusCode.FORBIDDEN, "You are not authorized");
        }

        if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
            throw new AppError(httpStatusCode.FORBIDDEN, "You are not authorized");
        }
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatusCode.FORBIDDEN, "You are not authorized");
        }
    }

    if (payload.password) {
        payload.password = await bcrypt.hash(payload.password,Number(envVabs.BCRYPT_SALT_ROUND))
    }

    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

    return newUpdatedUser

}


// get all user 

const getAllUsers = async()=>{
    const users =await User.find({})
    const totalUser = await User.countDocuments()

    return {
        data : users,
        meta:{
            total : totalUser
        }
    }
}




export const UserService = {
    createUser,
    getAllUsers,
    updateUser,
}