import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { authentication } from './authentication.js'
import { subjectReducer } from './subjectReducer.js'
import { signUpReducer } from './signupReducer.js'
import { feedReducer } from './feedReducer.js'
import { postReducer } from './postReducer.js'
import { profileReducer } from './profileReducer.js'
import { assignmentReducer} from './AssignmentReducer'
import { quizReducer} from './QuizReducer'
import { submitAssignmemtReducer } from './submitAssignmentReducer'
import { CreateAssignmemtReducer } from './CreateAssignmentReducer'
import { CheckAssignmemtReducer } from './CheckAssignmentReducer'
import { persistStore, persistCombineReducers } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
}


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            signUpReducer,
            authentication,
            subjectReducer,
            feedReducer,
            postReducer,
            profileReducer,
            assignmentReducer,
            quizReducer,
            submitAssignmemtReducer,
            CreateAssignmemtReducer,
            CheckAssignmemtReducer
        }),
        applyMiddleware(thunk)
    );

    // const persistor = persistStore(store); 
    return { store};
}
