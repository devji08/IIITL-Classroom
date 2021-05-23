import * as ActionTypes from './ActionTypes.js'

export const CheckAssignmemtReducer = (state={
        isLoading : false,
        errorMsg : null
    },action) => {
        switch(action.type){
            case  ActionTypes.CHECK_ASSIGNMENT :
                return {...state, isLoading : action.payload};
            case  ActionTypes.CHECK_ASSIGNMENT_LOADING :
                return {...state, isLoading:action.payload};
            case  ActionTypes.CHECK_ASSIGNMENT_ERROR :
                return {...state, isLoading:false, errorMsg : action.payload};
            default:
                return state;
        }
};