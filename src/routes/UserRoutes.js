const express=require("express")
const { loginUser, registerUser, currentUser } = require("../controllers/UserController")
const validateToken = require("../middleware/ValidateToken")

const router=express.Router()

router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.post("/current",validateToken,currentUser)

module.exports=router