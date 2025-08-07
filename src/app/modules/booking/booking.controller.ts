import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { BookingService } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";




const createBooking = catchAsync(async(req:Request,res:Response)=>{
 const decodeToken = req.user as JwtPayload
 const booking = await BookingService.createBooking(req.body,decodeToken.userId)

 sendResponse(res,{
    statusCode:200,
    success:true,
    message: "Bookings retrieved Successfully",
    data: booking
 })
})




export const bookingControler ={
    createBooking
}