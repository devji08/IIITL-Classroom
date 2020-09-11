import * as ActionType from './ActionTypes.js';

export const signUpReducer = (state = {
        isLoading : false,
        errorMsg : null,
    }, action) => {
        switch(action.type){
            case ActionType.SIGNUP_USER :
                return {...state, isLoading : false, errorMsg : null};
            case ActionType.SIGNUP_USER_LOADING :
                return {...state, isLoading : action.payload, errorMsg : null};
            case ActionType.SIGNUP_USER_ERROR :
                return {...state, isLoading : false, errorMsg : action.payload};
            default :
                return state;
        }
};