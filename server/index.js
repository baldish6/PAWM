import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended : true}));
app.use(cors());

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


