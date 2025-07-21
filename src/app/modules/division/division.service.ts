import AppError from "../../errorHelpers/AppEror";
import { IDevision } from "./division.interface";
import { Division } from "./division.model";
import { StatusCodes } from "http-status-codes";

// createDivision
const createDivision =async(payload : IDevision)=>{
 const exsistingDivition  = await Division.findOne({name:payload.name})
 if(exsistingDivition){
    throw new AppError(404,"A division with this name already exists")
 }

 const division = await Division.create(payload)
 return division
}

// updateDivition
const updateDivision =async(id:string,payload:Partial<IDevision>)=>{
 const isExist =await Division.findById(id)
 if(!isExist){
    throw new AppError(404,"Divition is not found")
 }

 const isduplicateDivision = await Division.findOne({
    name: payload.name,
    _id: {$ne:id}
 })
 if(isduplicateDivision){
    throw new AppError(404,"A division with this name already exists.")
 }

 const updateDivision = await Division.findByIdAndUpdate(id,payload,{new:true,runValidators:true})
 return updateDivision
}

// get all division
const getAllDivision =async()=>{
 const data  = await Division.find({})
 
 const totalDivisions = await Division.countDocuments()

 return {
   data,
   meta:{
      total : totalDivisions
   }
 }

}
// get One division
const getOneDivision =async(id:string)=>{
 const data  = await Division.findById(id)

 if(!data){
   throw new AppError(StatusCodes.NOT_FOUND,"Division Not found")
 }

 return data

}
// get One division
const deleteOneDivision =async(id:string)=>{
 const data  = await Division.findById(id)

 if(!data){
   throw new AppError(StatusCodes.NOT_FOUND,"Division Not found")
 }
 await Division.deleteOne({_id: id})

 return null

}

export const DivistionService ={
    createDivision,
    updateDivision,
    getAllDivision,
    getOneDivision,
    deleteOneDivision
}