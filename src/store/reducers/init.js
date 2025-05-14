import {
    APP_INIT_STARTED,
    PUBLIC_INIT_FINISHED,
    APP_AUTH_INIT_FINISHED
} from '../actionTypes/init'

const INITIAL_STATE = {
    initStarted: false,
    publicInitFinished: false,
    appAuthInitFinished: false
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_INIT_STARTED :
            return {
                ...state,
                initStarted: true
            }
        case PUBLIC_INIT_FINISHED:
          
            return {
                ...state,
                publicInitFinished: true
            } 
        case APP_AUTH_INIT_FINISHED: 
            return {
                ...state,
                appAuthInitFinished: true
            }
           
        default:
            return state            
    }
}

export default reducer

