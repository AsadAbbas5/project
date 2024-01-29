const express = require("express")
const mongoose = require("mongoose")

const addProductSchema = new mongoose.Schema({
    producttitle: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productImage: {
        type: String
    },
    description: {
        type: String,
        rquired: true
    },
    catagry: {
        type: String,
       
    }

})

const addProduct = mongoose.model("products", addProductSchema)

module.exports = addProduct