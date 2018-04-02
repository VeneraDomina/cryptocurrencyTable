import { FETCH_CRYPTOS_BEGIN, FETCH_CRYPTOS_SUCCESS, FETCH_CRYPTOS_FAILURE } from '../actions/cryptoActions';

const initialState = {
    items:      [],
    cryptoList: [],
    loading:    false,
    error:      null
};

export default function cryptoReducer (state = initialState, action) {

    if (action.type === FETCH_CRYPTOS_BEGIN) {
        return {
            ...state,
            loading: true,
            error:   null
        };
    } else if (action.type === FETCH_CRYPTOS_SUCCESS) {
        return {
            ...state,
            loading:    false,
            items:      action.payload.cryptos,
            cryptoList: action.payload.cryptos
        };
    } else if (action.type === FETCH_CRYPTOS_FAILURE) {
        return {
            ...state,
            loading:    false,
            error:      action.payload.error,
            items:      [],
            cryptolist: []
        };
    }

    return state;
}
