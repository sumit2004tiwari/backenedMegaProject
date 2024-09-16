import mongoose, { Aggregate, Schema } from "mongoose";
import mongooseAggregatePagination from "mongoose-aggregate-paginate-v2"

const VideoSchema = new mongoose.Schema({
    viedoFile : {
        type: String,
        required : true
    },
    thumbnail : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true,
        default : 0
    },
    views : {
        type : Number,
        required : true,
        default : true
    },
    isPublished : {
        type : Boolean,
        required :true
    },
    owner : {
        type : [{
            type : Schema.Types.ObjectId,
            ref : "User"
        }]
    }

},{timestamps : true})

VideoSchema.plugin(mongooseAggregatePagination)


export const Video = mongoose.models("Video" , VideoSchema )