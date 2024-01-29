import { authActionType } from "../../action/authActiontype"
const initalState = {
    user: null,
    token: null,
    isLoaded: false,
    isLogined: false
}
const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case authActionType.SIGN_IN:
            return {
                ...state,
                user: action.data.user,
                token: action.data.token,
                isLoaded: true,
                isLogined: true
            }
        case authActionType.PROFILE_LOADED:
            return {
                ...state,
                user: action.user,
                token: localStorage.getItem("token"),
                isloaded: true,
                islogin: true
            }

            case authActionType.LOG_OUT:
                return {
                    ...initalState
                }
        default:
            return state
    }

}

export default authReducer