import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js'
import imgRoutes from './routes/img.js'
import commentRoutes from './routes/comment.js'

/* CONFIGURATIONS */
dotenv.config();
const app = express();

//middlewares
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);


//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });


/* MONGOOSE */
const connect = () =>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("connected to db ")
    }).catch((err)=>{throw err;});
}

app.listen(8800,()=>{
    connect()
    console.log("connected to server ")
})