const mongoose=require("mongoose")

const ConnectDB=async()=>{
    try{
        const connect=await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`Database Connected at ${connect.connection.host}/${connect.connection.name}`.cyan.underline)
        
    }catch(error){
        console.log(`${error}`.red.underline.italic)
        process.exit(1)
    }
    
}

module.exports=ConnectDB