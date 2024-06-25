import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const usersReducer = (state =[], action) => {
    if(action.type === 'FETCH_USERS'){
        return action.payload;
    }
    return state;
};

const deleteReducer = (state='',action) =>{
    if(action.type === 'DELETE_USER'){
        if(action.payload === '1 record deleted'){
            return 'yes'
        }
        else if(action.payload==='0 record deleted'){
            return 'no'
        }
        else{
            return ''
        }
    }
    else{
        return state;
    }
}

const insertReducer = (state='',action) =>{
    if(action.type === 'INSERT_USER'){
        if(action.payload === '1 record inserted'){
            return 'yes'
        }
        else{
            return ''
        }
    } 
    else{
        return state;
    }
}

const historyReducer = (state=[],action) => {
    if(action.type === 'FETCH_HISTORY'){
        return action.payload
    }
    return state;
}

const userReducer = (state={}, action) => {
    if(action.type === 'FETCH_USER'){
        return action.payload
    }
    return state;
}

export default combineReducers({
    users:usersReducer,
    user:userReducer,
    form:formReducer,
    delete:deleteReducer,
    history:historyReducer,
    insert:insertReducer
});