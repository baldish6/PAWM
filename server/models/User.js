import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name: {
        type:String,
        required: true,
        min:2,
        max:50,
    },
    email: {
        type:String,
        required: true,
        max:50,
        unique: true,
    },
    password: {
        type:String,
        min:5,
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribedUser:{
        type:[String],
        default:[]
    },
    fromGoogle: {
        type: Boolean,
        default: false,
      },
},{timestamps:true});

export default mongoose.model("User",UserSchema)