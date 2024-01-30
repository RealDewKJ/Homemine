import { Router } from "express";
import { sample_users } from "../data";
import  jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs'
const router = Router();


router.get("/seed", asyncHandler(
    async (req,res)  => { 
       const userCount = await UserModel.countDocuments();
         if (userCount > 0) {
           res.send("Seed is already done!")
           return
         }
         await UserModel.create(sample_users)
         res.send("Seed Is Done")
       })
   ) 

router.post("/login", asyncHandler(
 async  (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await UserModel.findOne({email, googleAccess: false})
    if(user && (await bcrypt.compare(password,user.password))){
        res.send(generateTokenResponse(user))
    }else{
      res.status(HTTP_BAD_REQUEST).send("Username or Password is invalid!")
    }
}
) 
)

router.post('/logingoogle', asyncHandler(
  async (req, res) => {
    const email = req.body.email;
    const password = 'googleAccess';
    const name = req.body.name;
    const user = await UserModel.findOne({email, googleAccess: true})
    if(user) {
        res.send(generateTokenResponse(user))
    }else{
      const newUser: User = {
        id: '',
        name,
        email: email.toLowerCase(),
        password: password,
        address: 'th',
        googleAccess: true,
        isAdmin: false
      }
      const createUser = await UserModel.create(newUser)
      res.send(generateTokenResponse(createUser))
    }
}) 
)

router.post('/register', asyncHandler(
  async (req, res) => {
    const { name, email, password, address} = req.body
    const user = await UserModel.findOne({email, googleAccess: false})
    if(user) {
      res.status(HTTP_BAD_REQUEST).send("User is already exits, please login!")
      return  
    } 

    const encryptedPassword = await bcrypt.hash(password, 10)

    const newUser:User = {
      id: '',
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      googleAccess: false,
      isAdmin: false
    }

    const dbUser = await UserModel.create(newUser)
    res.send(generateTokenResponse(dbUser))
  }
))

const generateTokenResponse = (user:any)=>{
 const token = jwt.sign({
  id:user.id, email:user.email, isAdmin:user.isAdmin, name:user.name, address:user.address
 },"SecretKeyDew", {
    expiresIn:"1m"
 });
 
 user._doc.token = token;
 return user;
}

export default router