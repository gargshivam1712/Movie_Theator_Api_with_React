import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore,applyMiddleware} from 'redux'
import {rootReducer} from "./rootReducer"
import thunk from 'redux-thunk'

const initialState = {}




export const store = createStore(rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)))
