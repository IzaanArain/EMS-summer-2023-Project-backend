const asyncHandler = require('express-async-handler')
const User=require("../models/UserModel")
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    // console.log(process.env.SECRET_TOKEN)
    return jwt.sign({ _id: _id }, process.env.SECRET_TOKEN, { expiresIn: "1d" });
  };

//@desc login a user
//@route POST /api/users/login/
//@access Public
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const user=await User.findOne({email})
    if(!user){
        res.status(400)
        throw new Error("incorrect email")
    }
    //compare password with hashedcpassword
    const match=await bcrypt.compare(password, user.password)
    if(!match){
        res.status(400)
        throw Error("Incorrecrt password")
    }
    //create token
    // console.log(user)
    const token = createToken(user._id);
    if(user){
        // console.log(user._id)
        res.status(200).json({
            fname:user.fname,
            lname:user.lname,
            email:user.email,
            token:token
        })
    }else{
        throw new Error("email or password is not valid")
    }
    // res.status(200).json({message:"you have loged in"})
})

//@desc register a user
//@route POST /api/users/register/
//@access Public
const registerUser=asyncHandler(async(req,res)=>{
    const {fname,lname,email,password}=req.body

    if(!fname || !lname || !email || !password){
        res.status(400)
        throw new Error("all fields mandatory")
    }
    // if(!validator.isEmail(email)){
    //     throw Error("Email is not valid")
    // }
    // if(!validator.isStrongPassword(password)){
    //     throw Error("password is not strong enough")
    // }
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("user is already registered")
    }
    //hash password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    // console.log("hashed Password:",hashedPassword)

    //craete a user
    const user=await User.create({
        fname,
        lname,
        email,
        password:hashedPassword,
    })
    // console.log(`user created : ${user}`)
    const token = createToken(user._id);
    if(user){
        res.status(201).json({
            _id:user._id,
            email:user.email,
            fname:user.fname,
            lname:user.lname,
            token:token,
        })
    }else{
        res.status(400)
        throw new Error("User data is not valid")
    }
    // res.status(200).json({message:"you have registered"})
})

const currentUser=asyncHandler(async(req,res)=>{

    // res.status(200).json({message:"curreny user"})
    res.status(200).json(req.user)
})


module.exports={loginUser,registerUser,currentUser}