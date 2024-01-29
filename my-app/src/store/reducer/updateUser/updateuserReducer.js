import { updateuserActin } from "../../action/actionType/updateuserAction"
let initalState = {
    updateusers: [],
    isLoaded: false,
    isLogin: false,
}
const updatuserReducer = (state = initalState, action) => {
    switch (action.type) {

        case updateuserActin.ADD_UPDATE_USER:
            return {
                updateusers: action.updateuser
            }

        default:
            return state
    }
}
export default updatuserReducer