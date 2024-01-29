import { AddproductAction } from "../../action/actionType/addproductAction"

let initalState = {
    products: [],
    isLoaded: false,
    isLogined: false
}
const AddProductReducer = (state = initalState, action) => {
    console.log(action, "checking actg")
    switch (action.type) {
        case AddproductAction.ADD_PRODUCT:
            return {
                ...state,
                products: action.data,
            }
        case AddproductAction.EDIT_PRODUCT:
            console.log("Current State:", state);
            console.log("Action Payload:", action.product);

            const updatedProducts = state.products.map((product) => {
                if (product._id !== action.product._id) return product;
                else return action.product;
            });

            console.log("Updated Products:", updatedProducts);

            return {
                ...state,
                products: updatedProducts,
            };


        case AddproductAction.PRODUCTLOADED:
            return {
                ...state,
                products: action.data
            }

        default:
            return state
    }

}
export default AddProductReducer