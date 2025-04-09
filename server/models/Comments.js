import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
    {
        userId : {
            type: String,
            required: true,
        },
        imgId:{
            type:String,
            required:true,
        },
        desc:{
            type:String,
            required:true,
        }
    }
);
export default mongoose.model("Video", ImageSchema);