import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { apiImage } from '../constants';
import { fetchCryptos } from '../actions/cryptoActions';
import { changeQty, changePage } from '../actions/paginationActions';
import { findCrypto } from '../actions/searcherAction';

import Feed from '../components/Feed';
import './App.css';

class App extends Component {

    static propTypes = {
        changePage:   PropTypes.func.isRequired,
        changeQty:    PropTypes.func.isRequired,
        cryptoList:   PropTypes.object.isRequired,
        currentPage:  PropTypes.number.isRequired,
        fetchCryptos: PropTypes.func.isRequired,
        findCrypto:   PropTypes.func.isRequired,
        loading:      PropTypes.bool.isRequired,
        qty:          PropTypes.number.isRequired,
        searcher:     PropTypes.string.isRequired,
        error:        PropTypes.oneOf([null, PropTypes.object])
    };

    render () {
        const { error, loading, cryptoList, currentPage, searcher, qty, fetchCryptos, changeQty, changePage, findCrypto } = this.props;
        const cryptoKey = Object.keys(cryptoList);
        const cryptoListForRender = [];
        let cryptoNumber = null;

        cryptoKey.forEach((i) => {
            if (cryptoList[i].CoinName.includes(searcher)) {
                cryptoListForRender.push([
                    cryptoList[i].Id,
                    ++cryptoNumber,
                    apiImage + cryptoList[i].ImageUrl,
                    cryptoList[i].CoinName
                ]);
            }
        });

        return (<Feed
            changePage = { changePage }
            changeQty = { changeQty }
            cryptoList = { cryptoListForRender }
            currentPage = { currentPage }
            error = { error }
            fetchCryptos = { fetchCryptos }
            findCrypto = { findCrypto }
            loading = { loading }
            qty = { qty }
            searcher = { searcher }
        />);
    }
}
const mapStateToProps = (state) => ({
    loading:     state.cryptoReducer.loading,
    error:       state.cryptoReducer.error,
    searcher:    state.searchReducer,
    cryptoList:  state.cryptoReducer.cryptoList,
    currentPage: state.paginationReducer.currentPage,
    qty:         state.paginationReducer.qtyCryptosInTable
});

const mapDispatchToProps = (dispatch) => ({
    fetchCryptos: () => {
        dispatch(fetchCryptos());
    },
    changeQty: (qty) => {
        dispatch(changeQty(qty));
    },
    changePage: (page) => {
        dispatch(changePage(page));
    },
    findCrypto: (crypto) => {
        dispatch(findCrypto(crypto));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
