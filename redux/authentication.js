import * as ActionTypes from './ActionTypes.js';

export const authentication = (state = {
        user : null,
        isLoading : false,
        errorMsg : null
    }, action) => {
        switch(action.type){
            case ActionTypes.ADD_USER :
                return{...state, user : action.payload, isLoading : false, errorMsg:null};
            case ActionTypes.REMOVE_USER :
                return {...state, user : null, errorMsg : null};
            case ActionTypes.ADD_USER_ERROR :
                return {...state, errorMsg : action.payload, isLoading : false};
            case ActionTypes.ADD_USER_LOADING :
                return {...state, isLoading : action.payload, errorMsg : null};
            default :
                return state;
        }
};