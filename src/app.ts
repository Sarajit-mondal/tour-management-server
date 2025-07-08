import express, { Request, Response } from "express"




const app = express()



app.get("/",(req:Request,res:Response)=>{
  res.status(200).json({
    message: "Welcom to tour management System backand"
  })
})


export default app;