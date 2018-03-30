import { FETCH_CRYPTOS_BEGIN, FETCH_CRYPTOS_SUCCESS, FETCH_CRYPTOS_FAILURE } from '../actions/cryptoActions';
import { apiImage } from '../constants';

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
        let cryptoNumber = null;
        const cryptoKey = Object.keys(action.payload.cryptos);
        const cryptoList = cryptoKey.map(
            (key) => [
                action.payload.cryptos[key].Id,
                ++cryptoNumber,
                apiImage + action.payload.cryptos[key].ImageUrl,
                action.payload.cryptos[key].CoinName
            ]
        );

        return {
            ...state,
            loading: false,
            items:   action.payload.cryptos,
            cryptoList
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
