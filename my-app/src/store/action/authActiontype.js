import axios from "axios"

 export const authActionType  = {
            SIGN_IN:"signin",
            PROFILE_LOADED:"profile loaded"
}

export const loadProfile = ()=>{
        return (dispatch,getstate)=>{

            const token = localStorage.getItem("token")
            if(token){
                axios.get("/api/user/profile").then(
                    res=>{
                        dispatch({type:authActionType.PROFILE_LOADED,user:res.data.user})
                    }
                ).catch( error=>
                    console.log(error)
                )
            }

        }
}