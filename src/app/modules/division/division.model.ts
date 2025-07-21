import { model, Schema } from "mongoose";
import { IDevision } from "./division.interface";

const divisionSchema = new Schema<IDevision>({
    name: {type:String,required:true,unique:true},
    slug: {type:String,unique:true},
    thumbnail: {type:String},
    description: {type:String}
},{
    timestamps: true
})



divisionSchema.pre("save",async function(next){
 if(this.isModified("name")){
    const baseSlug = this.name.toLowerCase().split(" ").join("-")
 let slug = `${baseSlug}-division`; 
if (baseSlug.includes("division")) {
  slug = baseSlug; // avoid repeating
}
  let counter = 0;
        while (await Division.exists({ slug })) {
            slug = `${slug}-${counter++}` // dhaka-division-2
        }

 this.slug = slug
 }
 next()
})


divisionSchema.pre("findOneAndUpdate",async function(next){
const division = this.getUpdate() as Partial<IDevision>

if(division.name){
  const baseSlug = division.name.toLowerCase().split(" ").join("-")

 let slug = `${baseSlug}-division`
 if(baseSlug.includes("division")){
  slug = baseSlug;
 }
   let counter = 0;
        while (await Division.exists({ slug })) {
            slug = `${slug}-${counter++}` // dhaka-division-2
        }
division.slug = slug

}

this.setUpdate(division)
next()

})



export const Division  = model<IDevision>("Division",divisionSchema)