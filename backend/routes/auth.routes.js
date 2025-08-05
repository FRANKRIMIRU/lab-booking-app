import { Router } from "express";
import UserModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

//this is for the logging in and out shenanigans 
const authRouter = Router();

authRouter.post('/sign-up', async (req, res) => {
  const { name, email, password,adminCode } = req.body;
  try {
 
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({message: 'User already exists with this email'})
    }
    
    const role= adminCode === process.env.ADMIN_CODE? "admin":"client"

    const user = await UserModel.create({
      name,
      email,
      password,
      role
    })
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });


    res.status(201).json({message:`welcome ${user.name}`,user})
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
});
  

authRouter.post('/sign-in', async (req, res) =>{
   try {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email })
  if (!user) {
    return res.status(404).json({message:'User not found'})
  }
     const isMatch = (await user.matchPassword(password));
     if (!isMatch) {
      return res.status(401).json({message:'incorrect password'})
     }
   res.status(200).json({message:`welcome back ${user.name}`,user})
   }
   
   catch (err) { res.status(500).json({ message: "Server error", error: err.message }) }
});


authRouter.post('/sign-out', (req, res) => res.clearCookie("token").status(200).json({message:"Signed out"}));
export default authRouter;