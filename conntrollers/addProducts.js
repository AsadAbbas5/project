const express = require("express")
const addProduct = require("../module/addProduct")
const router = express.Router()
const mongoose = require("mongoose")
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');




// Functions for Multer For Image
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.mkdir(`content/products/`, { recursive: true });
      cb(null, `content/products/`);
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



router.post("/addproduct", upload.single("productImage"), async (req, res) => {

  try {
    const data = {
      catagry: req.body.catagry,
      producttitle: req.body.producttitle,
      productPrice: req.body.productPrice,
      description: req.body.description,
      catagry: req.body.category
    }
    if (req.file && req.file.filename) {
      data.productImage = req.file.filename;
    }

    const product = new addProduct(data)

    await product.save()

    const products = await addProduct.find()
    res.status(200).send({
      success: true,
      product: products
    })
  } catch (error) {
    console.log(error)
  }
})


router.post("/edit", upload.single("productImage"), async (req, res) => {
  try {
    const data = {
      producttitle: req.body.producttitle,
      productPrice: req.body.productPrice,
      catagry: req.body.catagry,
      description: req.body.description
    };
    if (req.file && req.file.filename) {
      data.productImage = req.file.filename;
    }
    await addProduct.findByIdAndUpdate(req.body.productId, data);

    let updatedProduct = await addProduct.find();

    res.status(200).send({
      success: true,
      updatedProduct: updatedProduct
    })
  } catch (error) {
    console.error(error);

  }
});
router.delete("/delete", async (req, res) => {
  try {
    const productId = req.body.productId;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
          success: false,
          error: 'Invalid productId'
      });
  }

    const deleteProduct = await addProduct.findByIdAndDelete(productId);
    let remove = await addProduct.find();

    res.status(200).send({
      success: true,
      deleteProduct: deleteProduct
    })

  } catch (error) {
    console.log(error)
  }

})
router.get("/loadProduct", async (req, res) => {
  try {
    const products = await addProduct.find()
    console.log(products)
    res.status(200).send({
      success: true,
      product: products
    })
  } catch (error) {
    console.log(error)
  }
})
module.exports = router