require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./conntrollers/users")
const addProductRoutes = require("./conntrollers/addProducts")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors());
app.use("/api/user", userRoutes)
app.use("/api/addproducts", addProductRoutes)


mongoose.connect("mongodb://127.0.0.1/project").then(() => {
    console.log("data base connect Succfully")
}).catch(error => {
    console.log(error)
})
app.listen(5000, () => {
    console.log("server listen port 5000")
})