/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import {Server} from "http"
import mongoose from "mongoose";
import app from "./app";
import { error } from "console";
import { envVabs } from "./app/config/env";
import { superAdmin } from "./app/utils/superAdmin";


let server : Server;



const startServer = async ()=>{
  try {
    await mongoose.connect(envVabs.DB_URL)
  console.log("Connected to DB")
 server = app.listen(5000,()=>{
    console.log(`Server is ranning http://localhost:${envVabs.PORT}`)
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error : any) {
    console.log(error)
  }
}

(async () => {
    await startServer()
     await superAdmin()
})()


process.on("SIGTERM",(error)=>{
console.log("Sigterm detected.... server shutting down...")
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1)
})
process.on("SIGINT",(error)=>{
console.log("SIGINT detected.... server shutting down...")
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1)
})


process.on("unhandledRejection",(error)=>{
console.log("Unhandled Rejection detected.... server shutting down...")
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on("uncaughtException",(error)=>{
  console.log("Unhandled Exception detected.... server shutting down...",error)
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1)
})


// unhandler redection error
//  Promise.reject(new Error("I forgot to catch this promise"))

// uncaught exception
// throw new Error("I forgot to handle local error")
