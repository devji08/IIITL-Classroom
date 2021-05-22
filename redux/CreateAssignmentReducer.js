import * as ActionTypes from './ActionTypes.js'

export const CreateAssignmemtReducer = (state={
        isLoading : false,
        errorMsg : null
    },action) => {
        switch(action.type){
            case  ActionTypes.CREATE_ASSIGNMENT :
                return {...state, isLoading : action.payload};
            case  ActionTypes.CREATE_ASSIGNMENT_LOADING :
                return {...state, isLoading:action.payload};
            case  ActionTypes.CREATE_ASSIGNMENT_ERROR :
                return {...state, isLoading:false, errorMsg : action.payload};
            default:
                return state;
        }
};