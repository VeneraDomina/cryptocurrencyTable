import { api } from '../constants';
import axios from 'axios';

export const FETCH_CRYPTOS_BEGIN   = 'FETCH_CRYPTOS_BEGIN';
export const FETCH_CRYPTOS_SUCCESS = 'FETCH_CRYPTOS_SUCCESS';
export const FETCH_CRYPTOS_FAILURE = 'FETCH_CRYPTOS_FAILURE';

export const fetchCryptosBegin = () => ({
    type: FETCH_CRYPTOS_BEGIN
});

export const fetchCryptosSuccess = (cryptos) => ({
    type:    FETCH_CRYPTOS_SUCCESS,
    payload: { cryptos }
});

export const fetchCryptosFailure = (error) => ({
    type:    FETCH_CRYPTOS_FAILURE,
    payload: { error }
});

function handleErrors (response) {
    if (response.status !== 200) {
        throw Error(response.statusText);
    }

    return response;
}

export function fetchCryptos () {
    return async (dispatch) => {
        dispatch(fetchCryptosBegin());

        try {
            const success = await axios.post(api);

            handleErrors(success);

            return dispatch(fetchCryptosSuccess(success.data.Data));
        } catch (error) {
            return dispatch(fetchCryptosFailure(error));
        }
    };
}
