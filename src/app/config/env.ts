
import dotenv from "dotenv"

dotenv.config()



const loadEnvVariables = ()=>{
    const requiredEnvVariables = ["PORT","DB_URL","NODE_ENV","BCRYPT_SALT_ROUND","JWT_ACCESS_EXPIRES","JWT_ACCESS_SECRET","SUPPER_ADMIN_PASSWORD","SUPPER_ADMIN_EMAIL","FRONTEND_URL","GOOGLE_CALLBACK_URL","EXPRESS_SESSION_SECRET","GOOGLE_CLIENT_ID","GOOGLE_CLIENT_SECRET"]

    requiredEnvVariables.forEach((key)=>{
        if(!process.env[key]){
            throw new Error (`Missing require environment variabl ${key}`)
        }

    })


    return {
        PORT : process.env.PORT as string,
        DB_URL : process.env.DB_URL as string,
        NODE_ENV : process.env.NODE_ENV as string,
        BCRYPT_SALT_ROUND : process.env.BCRYPT_SALT_ROUND as string,
        JWT_ACCESS_EXPIRES : process.env.JWT_ACCESS_EXPIRES as string,
        JWT_ACCESS_SECRET : process.env.JWT_ACCESS_SECRET  as string,
        JWT_REFRESH_SECRET : process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRES : process.env.JWT_REFRESH_EXPIRES  as string,
        SUPPER_ADMIN_EMAIL : process.env.SUPPER_ADMIN_EMAIL as string,
        SUPPER_ADMIN_PASSWORD : process.env.SUPPER_ADMIN_PASSWORD as  string,
        FRONTEND_URL : process.env.FRONTEND_URL as string,
        GOOGLE_CALLBACK_URL : process.env.GOOGLE_CALLBACK_URL as string,
        EXPRESS_SESSION_SECRET : process.env.EXPRESS_SESSION_SECRET as string,
        GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID as string,


        

    }
}

export const envVabs = loadEnvVariables()