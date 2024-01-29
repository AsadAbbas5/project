const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const User = require('../module/User')
const { creatToken } = require("../utils/utils")
const saltRounds = 10;
const verifyuser = require("../middleWares/veryfiyUser")
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');


// Functions For Multer For Image

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.mkdir(`content/updateuser/`, { recursive: true });
      cb(null, `content/updateuser/`);
    } catch (err) {
      cb(err, null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['jpg', 'png', 'gif', 'bmp', 'jpeg'];
    const ext = path.extname(file.originalname).replace('.', '');
    if (allowedTypes.includes(ext))
      cb(null, true);
    else {
      cb(new Error("File type is not allowed"), false);
    }
  }
})


const router = express.Router()

router.use(["/profile"], verifyuser)


router.post('/signup', async (req, res) => {


  try {
    if (!req.body.userName) {
      throw new Error('userName requred')
    }

    if (!req.body.email) {
      throw new Error('email requred')
    }

    if (!req.body.password) {
      throw new Error('password requred')
    }

    if (!req.body.confirmPassword) {
      throw new Error('confirmPassword requred')
    }

    const userExisit = await User.findOne({ email: req.body.email })
    if (userExisit) {
      throw new Error('Email is allready regestered')
    }


    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashedPassword)


    const data = {
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword
    }
    const user = new User(data)
    await user.save()
    const signupUser = await User.findOne({
      email: req.body.email
    })
    res.status(200).send({
      success: true,
      signupUser
    })
  } catch (error) {
    console.log(error)
  }
})


router.post("/updateuser", upload.single("logo"), async (req, res) => {


  try {
    const hashpassword = await bcrypt.hash(req.body.userPassword, saltRounds)
    console.log(hashpassword)
    const data = {
      userName: req.body.username,
      email: req.body.useremail,
      password: await bcrypt.hash(req.body.userPassword, 10)
    }

    if (req.file && req.file.filename) {
      data.profilePicture = req.file.filename;
    }

    await User.findByIdAndUpdate(req.body.id, data)

    const updateUser = await User.findById(req.body.id)

    res.status(200).send({
      success: true,
      updateUser: updateUser
    })
  } catch (error) {
    console.log(error)
  }
})



router.post("/signin", async (req, res) => {

  try {
    if (!req.body.email) throw new Error("invalid request1")
    if (!req.body.password) throw new Error("invalid requests")
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      throw new Error("Email or Password Invalid1")
    }
    const hashedPassword = user.password
    console.log(hashedPassword)
    const isMatchPassword = await bcrypt.compare(req.body.password, hashedPassword)
    if (!isMatchPassword) {
      throw new Error("Password or Email Invalid2")
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

router.get("/profile", (req, res) => {
  try {
    console.log("Hitting APis")
    if (!req.user) {
      throw new Error("invalid requeset")
    }
    res.status(200).send({ profileLoaded: true, user: req.user })
  } catch (error) {
    console.log(error)
  }
})


module.exports = router