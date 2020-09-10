import * as ActionTypes from './ActionTypes.js';

export const authentication = (state = {
        user : null,
        isLoading : false,
        errormsg : null
    }, action) => {
        switch(action.type){
            case ActionTypes.ADD_USER :
                return{...state, user:action.payload, isLoading: false, errormsg:null};
            case ActionTypes.REMOVE_USER :
                return {...state, user : null, errormsg:null};
            case ActionTypes.ADD_USER_ERROR :
                return {...state, errormsg : action.payload, isLoading: false};
            case ActionTypes.ADD_USER_LOADING :
                return {...state, isLoading : action.payload, errormsg : null};
            default :
                return state;
        }
};