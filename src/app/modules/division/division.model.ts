import { model, Schema } from "mongoose";
import { IDevision } from "./division.interface";

const divisionSchema = new Schema<IDevision>({
    name: {type:String,required:true,unique:true},
    slug: {type:String,unique:true,required:true},
    thumbnail: {type:String},
    description: {type:String}
},{
    timestamps: true
})

export const division  = model<IDevision>("Division",divisionSchema)