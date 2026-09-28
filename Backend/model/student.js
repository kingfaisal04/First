//import mongoose
const mongoose=require("mongoose");

//Define Our Scheme
const Schema = mongoose.Schema;

// create schema
const StudentSchema= new Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    course:{
        type:String,
        required:true,
    },

    gender:{
        type: String,
        required:true,
    },

     location:{
        type: String,
        required:true,
    },

    phoneNumber:{
        type:Number,
        required:true,
    },
})


//define model
const StudentModel = mongoose.model("Student",StudentSchema)

//export model
module.exports=StudentModel;

