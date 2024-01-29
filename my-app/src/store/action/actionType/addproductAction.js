import axios from "axios"

export const AddproductAction = {
        PRODUCTLOADED: "productLoaded",
        ADD_PRODUCT:"addProduct",
        EDIT_PRODUCT:"editProduct",
        DELETE_PRODUCT:"delete product"
}

export const loadProducts = () => {
        return (dispatch, getState) => {
                axios.get("/api/addproducts/loadProduct").then(
                        res => {
                                dispatch({ type: AddproductAction.PRODUCTLOADED, data: res.data.product })
                        }
                ).catch(
                        error => console.log(error)
                )
        }
}


