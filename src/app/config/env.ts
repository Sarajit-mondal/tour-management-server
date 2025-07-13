
import dotenv from "dotenv"

dotenv.config()



const loadEnvVariables = ()=>{
    const requiredEnvVariables = ["PORT","DB_URL","NODE_ENV","BCRYPT_SALT_ROUND","JWT_ACCESS_EXPIRES","JWT_ACCESS_SECRET"]

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
        JWT_ACCESS_SECRET : process.env.JWT_ACCESS_SECRET  as string
        

    }
}

export const envVabs = loadEnvVariables()