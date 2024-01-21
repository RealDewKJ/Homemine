import dotenv from 'dotenv';
dotenv.config();
import express from "express"; 
import cors from "cors";
import furnitureRouter from './routes/furniture.routes'
import userRouter from './routes/user.routes'
import { dbConnect } from './config/db.config';
import verifyToken from './middleware/authJwt';
import orderRouter from './routes/order.routes'
dbConnect()

const app = express ();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/furnitures",verifyToken, furnitureRouter)
app.use("/api/user", userRouter)
app.use("/api/orders",verifyToken, orderRouter)


const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})