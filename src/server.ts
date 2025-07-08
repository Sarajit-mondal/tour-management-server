import {Server} from "http"
import mongoose from "mongoose";
import app from "./app";


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



process.on("unhandledRejection",()=>{
  
})