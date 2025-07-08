import {Server} from "http"
import mongoose from "mongoose";
import app from "./app";
import { error } from "console";


let server : Server;



const startServer = async ()=>{
  try {
    await mongoose.connect("mongodb+srv://sarajit:sarajitTour@tour.xblw4ts.mongodb.net/tour-management?retryWrites=true&w=majority&appName=tour")
  console.log("Connected to DB")
 server = app.listen(5000,()=>{
    console.log(`Server is ranning http://localhost:${5000}`)
  })
  } catch (error) {
    console.log(error)
  }
}

startServer()

let count ;

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
