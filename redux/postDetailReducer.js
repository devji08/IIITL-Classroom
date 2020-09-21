import * as ActionTypes from './ActionTypes.js'

export const postDetailReducer = (state={
        user : null,
        isLoading : true,
        errorMsg : null
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_USER :
                return {...state, user : action.payload, isLoading:false};
            case ActionTypes.FETCH_USER_ERROR :
                return {...state, errorMsg : action.payload, isLoading:false};
            default :
                return state;    
        }
};