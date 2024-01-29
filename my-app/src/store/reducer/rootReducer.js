import { combineReducers } from "redux"
import authReducer from "./authReducer/AuthReducer"
import updatuserReducer from "./updateUser/updateuserReducer"
import AddProductReducer from "./addProduct/AddProductReducer"


const allReducer = {
    auth: authReducer,
    updateuser: updatuserReducer,
    product: AddProductReducer
}
const rootReducer = combineReducers(allReducer)


export default rootReducer