import { combineReducers } from 'redux';

import cryptoReducer from './cryptoReducer.js';
import paginationReducer from './paginationReducer.js';

export default combineReducers({
    cryptoReducer,
    paginationReducer
});
