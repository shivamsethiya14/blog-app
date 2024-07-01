import {Schema,model,mongoose} from "mongoose";


const blogSchema=new Schema({
    title:{
        type:String,
        required :true
    },
    body:{
        type:String,
        required :true
    },
    coverImageurl:{
        type:String,
        required :false
    },
    createdBy:{
        type :Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})
export const Blog=mongoose.model("blog",blogSchema)