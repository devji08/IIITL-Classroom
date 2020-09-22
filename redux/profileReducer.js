import * as ActionTypes from './ActionTypes.js'

export const profileReducer = (state = {
        photo : null,
        isLoading : false,
        errorMsg : null
    }, action) => {
        switch(action.type){
            case ActionTypes.ADD_USER_PHOTO :
                return {...state, photo : action.payload, isLoading : false};
            case ActionTypes.ADD_USER_PHOTO_LOADING :
                return {...state, isLoading : action.payload};
            case ActionTypes.ADD_USER_PHOTO_ERROR :
                return {...state, errorMsg : action.payload, isLoading : false};
            default :
                return state;
        }
};