import * as ActionTypes from './ActionTypes.js'

export const submitAssignmemtReducer = (state={
        isLoading : false,
    },action) => {
        switch(action.type){
            case  ActionTypes.SUBMIT_ASSIGNMENT :
                return {...state, isLoading : action.payload};
            case  ActionTypes.SUBMIT_ASSIGNMENT_LOADING :
                return {...state, isLoading:action.payload};
            case  ActionTypes.SUBMIT_ASSIGNMENT_ERROR :
                return {...state, isLoading:false, errorMsg : action.payload};
            default:
                return state;
        }
};