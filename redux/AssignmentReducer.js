import * as ActionTypes from './ActionTypes.js'

export const assignmentReducer = (state={
        isLoading : true,
        errorMsg : null,
        assignments : null
    },action) => {
        switch(action.type){
            case  ActionTypes.ADD_ASSIGNMENT :
                return {...state, isLoading : false, assignments : action.payload};
            case  ActionTypes.ADD_ASSIGNMENT_ERROR :
                return {...state, isLoading:false, errorMsg : action.payload};
            default:
                return state;
        }
};