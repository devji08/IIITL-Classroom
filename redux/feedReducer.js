import * as ActionTypes from './ActionTypes.js';

export const feedReducer = (state = {
        posts : [],
        isLoading : true,
        errorMsg : null
    }, action) => {
        switch(action.type){
            case ActionTypes.FEED_ERROR : 
                return {...state, isLoading: false, errorMsg:action.payload};
            case ActionTypes.FEED_FETCH : 
                return {...state, isLoading: false, errorMsg:null, posts : action.payload};
            default :
                return state;
        }
};