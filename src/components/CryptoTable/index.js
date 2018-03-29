import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { apiImage } from '../../constants';
import Styles from './styles.scss';


class CryptoTable extends Component {
    static propTypes = {
        cryptos:     PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
        currentPage: PropTypes.number.isRequired,
        qty:         PropTypes.number.isRequired
    };

    shouldComponentUpdate (nextProps) {
        return !(this.props.qty === nextProps.qty && this.props.currentPage === nextProps.currentPage);
    }

    render () {
        const { cryptos, currentPage, qty } = this.props;

        const cryptoKey = Object.keys(cryptos);
        let cryptoNumber = null;

        const cryptoList = cryptoKey.map(
            (key) => (
                <tr key = { cryptos[key].Id }>
                    <td>{ ++cryptoNumber }</td>
                    <td> <img
                        className = { Styles.icon }
                        src = { apiImage + cryptos[key].ImageUrl }
                    /></td>
                    <td className = { Styles.absorbingColumn }>{ cryptos[key].CoinName }</td>
                </tr>
            ));

        const table = cryptoList.slice((currentPage-1)*qty, currentPage*qty);

        return (

            <table>
                <caption className = { Styles.tableCaption }>Cryptocurrency</caption>
                <tbody>
                    <tr>
                        <th>&#8470;</th>
                        <th>Icon</th>
                        <th>Name</th>
                    </tr>
                    { table }
                </tbody>
            </table>
        );
    }
}
const mapStateToProps = (state) => ({
    cryptos:     state.cryptosReducer.items,
    cryptolist:  state.cryptosReducer.cryptolist,
    currentPage: state.paginationReducer.currentPage,
    qty:         state.paginationReducer.qtyCryptosInTable
});

export default connect(mapStateToProps)(CryptoTable);
