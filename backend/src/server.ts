import express from "express";
import cors from "cors";
import { sample_furtitures, sample_tags, sample_users } from "./data";
import  jwt from "jsonwebtoken";

const app = express ();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get("/api/furnitures", (req,res ) =>{ 
    res.send(sample_furtitures);
})

app.get("/api/furnitures/search/:searchTerm" , (req, res) => {
    const searchTerm = req.params.searchTerm;
    const furnitures = sample_furtitures.filter(furniture => furniture.name.toLocaleLowerCase().includes(searchTerm.toLowerCase()))
    res.send(furnitures);
})

app.get("/api/furnitures/tags/" , (req, res) => {
    res.send(sample_tags);
})

app.get("/api/furnitures/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const furnitures = sample_furtitures
    .filter(furniture => furniture.tags?.includes(tagName));
    res.send(furnitures);
})

app.get("/api/furnitures/:furnitureId", (req, res) => {
    const furnitureId = req.params.furnitureId;
    console.log(furnitureId)
    const furnitures = sample_furtitures.find(furniture => furniture.id == furnitureId);
    res.send(furnitures);
})

app.post("/api/user/login", (req,res) => {
    const email = req.body.email;
    console.log(email)
    const password = req.body.password;
    const user = sample_users.find(user => user.email === email && user.password === password);
    console.log(user)
    if(user){
        res.send(generateTokenResponse(user))
    }else{
        res.status(400).send("User name or password is not valid!");
    }
})

const generateTokenResponse = (user:any)=>{
 const token = jwt.sign({
    email:user.email, isAdmin:user.isAdmin
 },"SomeRandomText", {
    expiresIn:"30d"
 });
 
 user.token = token;
 return user;
}



const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})