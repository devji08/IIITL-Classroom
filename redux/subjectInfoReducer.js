import * as ActionTypes from './ActionTypes.js';

export const subjectInfoReducer = (state = {
        subjectInfo : null,
        isLoading : true,
        errorMsg : null
    }, action) => {
        switch(action.type){
            case ActionTypes.SUBJECT_INFO_ERROR : 
                return {...state, isLoading : false, errorMsg : action.payload};
            case ActionTypes.SUBJECT_INFO_FETCH : 
                return {...state, isLoading : false, errorMsg : null, subjectInfo : action.payload};
            default :
                return state;
        }
};