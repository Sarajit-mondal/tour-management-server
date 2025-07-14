import AppError from "../../errorHelpers/AppEror";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.modle"
import httpStatusCode from "http-status-codes"
import bcrypt from "bcryptjs";
import { envVabs } from "../../config/env";
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
    getAllUsers
}