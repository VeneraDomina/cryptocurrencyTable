import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import TopPagination from '../TopPagination';
import CryptoTable from '../CryptoTable';
import Pagination from '../Pagination';
import Searcher from '../Searcher';

export default class Feed extends Component {
    static propTypes = {
        changePage:   PropTypes.func.isRequired,
        changeQty:    PropTypes.func.isRequired,
        cryptoList:   PropTypes.array.isRequired,
        currentPage:  PropTypes.number.isRequired,
        fetchCryptos: PropTypes.func.isRequired,
        findCrypto:   PropTypes.func.isRequired,
        loading:      PropTypes.bool.isRequired,
        qty:          PropTypes.number.isRequired,
        searcher:     PropTypes.string.isRequired,
        error:        PropTypes.oneOf([null, PropTypes.object])
    };

    componentDidMount () {
        this.props.fetchCryptos();
    }

    render () {
        const { error, loading, cryptoList, currentPage, searcher, qty, changeQty, changePage, findCrypto }  = this.props;

        if (error) {
            return <div>Error! { error.message }</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <section>
                <Searcher
                    findCrypto = { findCrypto }
                />
                <TopPagination
                    changeQty = { changeQty }
                    cryptoList = { cryptoList }
                    qty = { qty }
                />
                <CryptoTable
                    cryptoList = { cryptoList }
                    currentPage = { currentPage }
                    qty = { qty }
                    searcher = { searcher }
                />
                <Pagination
                    changePage = { changePage }
                    cryptoList = { cryptoList }
                    currentPage = { currentPage }
                    qty = { qty }
                />
            </section>
        );
    }
}
