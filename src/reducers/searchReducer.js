import { FIND_CRYPTO } from '../actions/searcherAction';

const initialState = '';

export default function searchReducer (state = initialState, action) {
    if (action.type === FIND_CRYPTO) {
        return action.payload;
    }

    return state;
}
