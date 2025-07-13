import { email } from "zod"
import { envVabs } from "../config/env"
import { User } from "../modules/user/user.modle"
import bcrypt from "bcryptjs";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";

export const superAdmin = async()=>{
 try {
    const isSuperAdminExist = await User.findOne({email : envVabs.SUPPER_ADMIN_EMAIL})
  if(isSuperAdminExist){
    console.log("Super Admin is exist")
    return;
  }

  const hasPassword = await bcrypt.hash(envVabs.SUPPER_ADMIN_PASSWORD,Number(envVabs.BCRYPT_SALT_ROUND))

 const authProvider:IAuthProvider = {
  provider: "credentials",
  providerId: envVabs.SUPPER_ADMIN_EMAIL
 }

 const payload: IUser ={
  name:"Super Admin",
  email : envVabs.SUPPER_ADMIN_EMAIL,
  role : Role.SUPER_ADMIN,
  password: hasPassword,
  isVerified : true,
  auths: [authProvider]
 }

 const superAdmin = await User.create(payload)
 console.log("Supper admine created")
 } catch (error) {
    console.log(error)
 }
}