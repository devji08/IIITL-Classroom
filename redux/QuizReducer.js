import * as ActionTypes from './ActionTypes.js'

export const quizReducer = (state={
        isLoading : true,
        errorMsg : null,
        quiz : null
    },action) => {
        switch(action.type){
            case  ActionTypes.ADD_QUIZ :
                return {...state, isLoading : false, quiz : action.payload};
            case  ActionTypes.ADD_QUIZ_ERROR :
                return {...state, isLoading:false, errorMsg : action.payload};
            default:
                return state;
        }
};