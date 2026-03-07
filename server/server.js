import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/connection.js'

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req,res)=>{
    res.send("Hey I am Rahul");
});

export default app;