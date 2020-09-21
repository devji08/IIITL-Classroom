import * as ActionTypes from './ActionTypes.js'

export const postReducer = (state={
        isLoading : false,
    },action) => {
        switch(action.type){
            case  ActionTypes.ADD_POST :
                return {...state, isLoading:false};
            case  ActionTypes.ADD_POST_LOADING :
                return {...state, isLoading:action.payload};
            case  ActionTypes.ADD_POST_ERROR :
                return {...state, isLoading:false, errorMsg : action.payload};
            default:
                return state;
        }
};