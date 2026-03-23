import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/connection.js'
import userRouter from './routes/userRoutes.js';


const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req,res)=>{
    res.send("Hey I am Rahul");
});

app.use("/api/user/webhooks", express.raw({ type: "application/json" }))
app.use('/api/user',userRouter)


app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${process.env.PORT}`)
})
export default app;