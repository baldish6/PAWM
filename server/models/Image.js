import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
    {
        userId : {
            type: String,
            required: true,
        },
        title:{
            type:String,
            required:true,
        },
        desc:{
            type:String,
            required:true,
        },
        imgUrl:{
            type:String,
            required:true,
        },
        likes:{
            type:[String],
            required:true,
        }
    }
);
export default mongoose.model("Video", ImageSchema);