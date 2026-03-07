import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/connection.js';

const PORT = process.env.PORT || 4000;

const app = express();

await connectDB();

app.get('/',(req,res)=>{
    res.send("Hey I am Rahul")
})


app.use(express.json())
app.use(cors())

app.listen(PORT,()=>{});