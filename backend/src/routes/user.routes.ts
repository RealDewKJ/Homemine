import { Router } from "express";
import { sample_users } from "../data";
import  jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs'
import verifyToken from "../middleware/authJwt";
const router = Router();


router.get('/', asyncHandler(
  async (req,res) => {
    const user = await UserModel.find();
    if(user) res.send(user) 
    else res.status(HTTP_BAD_REQUEST).send("Can't find User")
  }
))

router.get('/:id' ,asyncHandler(
  async (req,res) => {
    const user = await UserModel.findById(req.params.id)
    if (user) res.send(user)
    else res.status(HTTP_BAD_REQUEST).send("Can't find User")
  }
))

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
    const image = req.body.photoUrl
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
        isAdmin: false,
        imageUrl: image
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
      isAdmin: false,
      imageUrl: ''
    }

    const dbUser = await UserModel.create(newUser)
    res.send(generateTokenResponse(dbUser))
  }
))

const generateTokenResponse = (user:any)=>{
 const token = jwt.sign({
  id:user.id, email:user.email, isAdmin:user.isAdmin, name:user.name,imageUrl:user.imageUrl,address: user.address
 },"SecretKeyDew", {
    expiresIn:"1d"
 });
 
 user._doc.token = token;
 return user;
}

router.put('/update',verifyToken, asyncHandler (
  async (req,res) => {
    try {
      const user = req.body
      const result = await UserModel.updateOne(
        {_id: user.id},
        { $set: { ...user }}
      )
      if (result.modifiedCount > 0) {
        res.status(201).json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found or no changes made' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
 
  }
))

export default router