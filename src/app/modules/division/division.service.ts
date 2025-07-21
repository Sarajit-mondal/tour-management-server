import AppError from "../../errorHelpers/AppEror";
import { IDevision } from "./division.interface";
import { Division } from "./division.model";


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


export const DivistionService ={
    createDivision,
    updateDivision
}