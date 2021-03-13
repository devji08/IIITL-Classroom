import * as ActionTypes from './ActionTypes.js';

export const subjectReducer = (state = {
        subjects : null,
        isLoading : true,
        errorMsg : null
    }, action) => {
        switch(action.type){
            case ActionTypes.SUBJECT_ERROR : 
                return {...state, isLoading : false, errorMsg : action.payload};
            case ActionTypes.SUBJECT_FETCH : 
                return {...state, isLoading : false, errorMsg : null, subjects : action.payload};
            case ActionTypes.PROFESSOR_SUBJECT_ERROR : 
                return {...state, isLoading : false, errorMsg : action.payload};
            case ActionTypes.PROFESSOR_SUBJECT_FETCH : 
                return {...state, isLoading : false, errorMsg : null, subjects : action.payload};
            default :
                return state;
        }
};