import {
  Alert,
  Avatar,
  Box,
  Button,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { AddproductAction } from "../../../store/action/actionType/addproductAction";
import NoProducts from "../NoProducts";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Form, Field } from "react-final-form";
import TextInput from "../../liabery/form/TextInput";
import FileInput from "../../liabery/form/FileInput";
import SelectInput from "../../liabery/form/SelectInput";

function Dasshboard({ userId, products, user }) {
  const dispatch = useDispatch();
  const [profileImageUrl, setProfileImageUrl] = useState(
    "/path/to/default/avata.jpg"
  );
  const [producttitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productId, setProductId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCatagory] = useState();
  const [description, setdescription] = useState("");
  const [open, setOpen] = React.useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleEditBtn = (id) => {
    const selectedProduct = products.find((product) => product._id === id);
    if (selectedProduct) {
      setProductId(id);
      setProductTitle(selectedProduct.producttitle);
      setProductPrice(selectedProduct.productPrice);
      setCatagory(selectedProduct.catagry);
      setdescription(selectedProduct.description);
      setIsUpdate(true);
    }
  };

  const handleFormSubmit = (data) => {
    console.log("This is Data: ", data);
    try {
      if (isUpdate) {
        handleUpdate(data);
      } else {
        handleAddProduct(data);
      }
    } catch (error) {
      let message =
        error && error.response && error.response.data
          ? error.response.data.error
          : error.message;
      console.log(message);
    }
  };

  const handleAddProduct = async (data) => {
    console.log(data);
    try {
      let result = await axios.postForm(
        "/api/addproducts/addproduct",
        data
      );
      console.log(result);

      dispatch({
        type: AddproductAction.ADD_PRODUCT,
        data: result.data.product,
      });

      setOpen(true);
    } catch (error) {
      let message =
        error && error.response && error.response.data
          ? error.response.data.error
          : error.message;
      console.log(message);
    }
  };
  const handleUpdate = async (data) => {
    try {
      setIsUpdate(false);
      let result = await axios.postForm("/api/addproducts/edit", {
        ...data,
        productId,
      });
      console.log(result);

      if (result.data.success) {
        dispatch({
          type: AddproductAction.ADD_PRODUCT,
          data: result.data.updatedProduct,
        });

        setOpen(true);
      } else {
        console.error("Update failed:", result.data.message);
      }
    } catch (error) {
      let message =
        error && error.response && error.response.data
          ? error.response.data.error
          : error.message;
      console.log(message);
    }
  };
  const deleteProduct = async ({ data }) => {
    try {
      setIsUpdate(false);
      let result = await axios.delete("/api/addproducts/delete", {
        data: { ...data, productId: productId },
      });

      console.log(result);

      if (result.data.success) {
        dispatch({
          type: AddproductAction.DELETE_PRODUCT,
          data: result.data.deleteProduct,
        });
      } else {
        // Handle deletion failure
      }
    } catch (error) {
      let message =
        error && error.response && error.response.data
          ? error.response.data.error
          : error.message;
      console.log(message);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const validateData = (data) => {
    const errors = {};
    if (!data.producttitle) errors.producttitle = "Please enter Product Title";
    if (!data.productPrice) errors.productPrice = "Please enter Price";
    if (!data.description) errors.description = "Please enter Description";
    console.log(errors);
    return errors;
  };

  const options = [
    { label: "Select product", value: "Select product" },
    { label: "shurts", value: "shurts" },
    { label: "shoes", value: "shoes" },
    { label: "furinter", value: "furinter" },
  ];

  return (
    <Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          style={{
            position: "fixed",
            top: "7rem",
            left: "75%",
            transform: "translateX(-50%)",
          }}
        >
          <Typography>Add Product Successfully</Typography>
        </Alert>
      </Snackbar>

      <Box textAlign={"center"}>
        <Form
          onSubmit={handleFormSubmit}
          validate={validateData}
          initialValues={{
            producttitle: producttitle,
            productPrice: productPrice,
            description: description,
            category: category,
          }}
          render={({ handleSubmit, submitting, invalid }) => (
            <form
              onSubmit={handleSubmit}
              method="post"
              encType="multipart/form-data"
            >
              <Box>
                <Typography
                  color={"blue"}
                  fontSize={"2rem"}
                  fontWeight={600}
                  marginLeft={"4rem"}
                  marginTop={"2rem"}
                >
                  Add Product
                </Typography>
              </Box>

              <Field
                component={TextInput}
                type="text"
                name="producttitle"
                placeholder="Enter Product Title"
              />
              <Field
                size="small"
                component={SelectInput}
                type="text"
                name="category"
                options={options}
              />
              <Field
                component={TextInput}
                type="number"
                name="productPrice"
                placeholder="Enter Product Price"
              />
              <Field
                component={TextInput}
                multiline
                rows={3}
                type="text"
                name="description"
                placeholder="Enter Description"
              />
              <Field
                component={FileInput}
                inputProps={{ accept: "image/*" }}
                name="productImage"
              />

              <Button
                sx={{ marginTop: "20px" ,width:"20%" }}
                variant="contained"
                type="submit"
                disabled={invalid}
              >
                Submit
              </Button>
              <Button 
                sx={{ marginTop: "20px",marginLeft:"2rem",width:"20%" }}
                variant="contained"
                type="submit"
                disabled={invalid}
              >
                Update
              </Button>
            </form>
          )}
        />
      </Box>

      <div style={{ marginLeft: "4rem" }}>
        <table className="beautiful-table">
          <thead>
            <tr>
              <th>Img</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index}>
                  <Avatar
                    src={process.env.REACT_APP_BASE_URL + `content/products/${product.productImage}`}
                  />
                  <td>{product.producttitle}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.catagry}</td>
                  <td>{product.description}</td>
                  <td>
                    <buttton variant="contained"
                      onClick={() => handleEditBtn(product._id)}
                      className="edit-btn"
                    >
                      Edit
                    </buttton>
                    <buttton variant="contained" 
                      className="delete-btn"
                      onClick={() => deleteProduct(product._id)}
                    >
                       Delete
                    </buttton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <NoProducts />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Box>
  );
}

const mapStateProps = (state) => {
  return {
    isLogined: state.auth.user._Id,
    products: state.product.products,
    user: state.auth.user,
  };
};

export default connect(mapStateProps)(Dasshboard);
