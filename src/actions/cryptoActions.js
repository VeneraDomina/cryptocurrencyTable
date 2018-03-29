import { api } from '../constants';

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
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
}

export function fetchCryptos () {
    return (dispatch) => {
        dispatch(fetchCryptosBegin());

        return fetch(api)
            .then(handleErrors)
            .then((res) => res.json())
            .then((json) => {
                dispatch(fetchCryptosSuccess(json.Data));

                return json.Data;
            })
            .catch((error) => dispatch(fetchCryptosFailure(error)));
    };
}
