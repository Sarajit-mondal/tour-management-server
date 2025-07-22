import { QueryBuilder } from "../../utils/QueryBuilder"
import { Tour } from "./tour.modle"



const getAllTours = async(query:Record<string,string>)=>{
const queryBuilder = new QueryBuilder(Tour.find(),query)

const tours =queryBuilder
.filter()
.search()
}


export const TourService = {
    getAllTours
}