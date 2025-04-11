import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js'
import imgRoutes from './routes/img.js'
import commentRoutes from './routes/comment.js'
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";


/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(bodyParser.json());

//middlewares
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/img", imgRoutes);
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
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

app.listen(8800, () => {
  connect();
  console.log("Connected to Server");
});
