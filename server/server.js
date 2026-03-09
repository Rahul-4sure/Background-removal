import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/connection.js'
import userRouter from './routes/userRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req,res)=>{
    res.send("Hey I am Rahul");
});

app.use('/api/user',userRouter)

export default app;