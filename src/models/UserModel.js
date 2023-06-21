const mongoose=require("mongoose")
const {Schema}=mongoose

const UserSchmea=new Schema({
    fname:{
        type:String,
        required:[true,"please enter first name"]
    },
    lname:{
        type:String,
        required:[true,"please enter last name"]
    },
    password:{
        type:String,
        required:[true,"please enter password"]
    },
    email:{
        type:String,
        required:[true,"please enter first name"],
        unique:[true,"email address already exits"]
    }
},
{
    timestamps:true,
})

module.exports=mongoose.model("User",UserSchmea)