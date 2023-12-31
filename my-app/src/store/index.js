import { applyMiddleware, compose, createStore } from "redux"
import { thunk } from "redux-thunk"
import rootReducer from "./reducer/rootReducer"

let middleWare  = null

if(window.__REDUX_DEVTOOLS_EXTENSION__()){
    middleWare = compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__()
    )
}else{
    middleWare = applyMiddleware(thunk)
}

const store  = createStore(rootReducer,middleWare)

export default store