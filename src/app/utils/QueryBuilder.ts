import { Query } from "mongoose";
import { excludeField } from "../contants/contants";

export class QueryBuilder<T>{
public modelQuery : Query<T[],T>
public readonly query : Record<string,string>

constructor(modelQuery : Query<T[],T>,query:Record<string,string>){
this.modelQuery = modelQuery
this.query = query
}

filter():this{
    const filter = {...this.query}
    console.log(filter)
    for (const field of excludeField) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete filter[field]
     }
  console.log(filter)
    return this
}

search():this{
    console.log(this.query.searchTerm || "no search params")

    return this
}
}