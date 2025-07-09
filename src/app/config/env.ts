
import dotenv from "dotenv"

dotenv.config()



const loadEnvVariables = ()=>{
    const requiredEnvVariables = ["PORT","DB_URL","NODE_ENV"]

    requiredEnvVariables.forEach((key)=>{
        if(!process.env[key]){
            throw new Error (`Missing require environment variabl ${key}`)
        }

    })


    return {
        PORT : process.env.PORT as string,
        DB_URL : process.env.DB_URL!,
        NODE_ENV : process.env.NODE_ENV!

    }
}

export const envVabs = loadEnvVariables()