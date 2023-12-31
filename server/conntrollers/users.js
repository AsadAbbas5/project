const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const User = require('../module/User')
const { creatToken } = require("../utils/utils")
const verifyuser = require("../middleWares/veryfiyUser")

const router = express.Router()

router.use(["/profile"],verifyuser)


router.post("/signup", async (req, res) => {
           
    try {

        if (!req.body.firstName) {
            throw new Error("First Name is Required")
        }
        if (!req.body.lastName) {
            throw new Error("Last Name is Required")
        }
        if (!req.body.email) {
            throw new Error("Email is Required")
        }
        if (!req.body.Password) {
            throw new Error("Password is Required")
        }
        if (!req.body.ConfirmPassword) {
            throw new Error("ConfirmPassword is Required")
        }
        const hashPassword = await bcrypt.hash(req.body.Password, 10)

        if (req.body.Password !== req.body.ConfirmPassword)
            throw new Error("Passwords are not same");
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist) throw new Error('Email is Alredy Ragistered')
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            Password: hashPassword,
        }
        const user = new User(data)
        await user.save()
        const signupUser = await User.findOne({ email: req.body.email })
        res.status(200).send({
            success: true,
            user: signupUser
        })
    } catch (error) {
        console.log(error)
    }
})

router.post("/signin", async (req, res) => {
            
    try {
        if (!req.body.email) throw new Error("invalid request")
        if (!req.body.Password) throw new Error("invalid request")
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error("Email or Password Invalid")
        }
        const hashedPassword = user.Password
        const isMatchPassword = await bcrypt.compare(req.body.Password, hashedPassword)
        if (!isMatchPassword) {
            throw new Error("Password or Email Invalid")
        }
        const token = await creatToken(user, 24 * 60)
       
        res.status(200).send({
            user,
            token
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/profile",(req,res)=>{
            try{
                    if(!req.user){
                        throw new Error("invalid requeset")
                    }
                    res.status(200).send({profileLoaded:true,user:req.user})
            }catch(error){
                console.log(error)
            }
})
module.exports = router