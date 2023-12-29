import dotenv from 'dotenv';
dotenv.config();
import express from "express"; 
import cors from "cors";
import furnitureRouter from './routes/furniture.routes'
import userRouter from './routes/user.routes'
import { dbConnect } from './config/db.config';
dbConnect()

const app = express ();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/furnitures", furnitureRouter)
app.use("/api/user", userRouter)


const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})