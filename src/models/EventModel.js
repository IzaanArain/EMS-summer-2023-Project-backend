const mongoose=require("mongoose")
const {Schema}=mongoose

const EventSchema=new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
        required:[true,"please enter title of event"],
    },
    description:{
        type:String,
        required:[true,"please enter description of event"]
    },
    date:{
        type:String,
        required:[true,"please enter date of event"],
        // default:Date.now
    },
    time:{
        type:String,
        required:[true,"please enter the time of event"],
    },
    location:{
        type:String,
        required:[true,"please enter location of event"]
    }
},
{
    timestamps:true,
})

module.exports=mongoose.model("Event",EventSchema)