import { FIND_CRYPTO } from '../actions/searcherAction';

const initialState = '';

export default function searchReducer (state = initialState, action) {
    switch (action.type) {
        case FIND_CRYPTO:
            return action.payload;
        default:
            return state;
    }
}
