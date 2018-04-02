import { combineReducers } from 'redux';

import cryptoReducer from './cryptoReducer';
import paginationReducer from './paginationReducer';
import searchReducer from './searchReducer';

export default combineReducers({
    cryptoReducer,
    paginationReducer,
    searchReducer
});
