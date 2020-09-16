import * as ActionTypes from './ActionTypes.js';

export const feedReducer = (state = {
        posts : null,
        isLoading : false,
        errorMsg : null
    }, action) => {
        switch(action.type){
            case ActionTypes.FEED_LOADING : 
                return {...state, isLoading: true, errorMsg:null};
            case ActionTypes.FEED_ERROR : 
                return {...state, isLoading: false, errorMsg:action.payload};
            case ActionTypes.FEED_LOADING : 
                return {...state, isLoading: false, errorMsg:null, posts : action.payload};
            default :
                return state;
        }
};