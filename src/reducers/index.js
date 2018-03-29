import { combineReducers } from 'redux';

import cryptosReducer from './cryptosReducer.js';
import paginationReducer from './paginationReducer.js';

export default combineReducers({
    cryptosReducer,
    paginationReducer
});
