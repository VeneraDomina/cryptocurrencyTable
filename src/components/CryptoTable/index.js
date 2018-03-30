import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Styles from './styles.scss';


class CryptoTable extends Component {
    static propTypes = {
        cryptoList:  PropTypes.array.isRequired,
        currentPage: PropTypes.number.isRequired,
        qty:         PropTypes.number.isRequired,
        searcher:    PropTypes.string.isRequired
    };

    shouldComponentUpdate (nextProps) {
        return !(this.props.qty === nextProps.qty && this.props.currentPage === nextProps.currentPage && this.props.searcher === nextProps.searcher);
    }

    render () {
        const { cryptoList, currentPage, searcher, qty } = this.props;
        let filteredCryptoList = [];

        if (cryptoList.length) {
            filteredCryptoList = cryptoList.filter((item) => item[3].includes(searcher));
        }

        const table = filteredCryptoList.slice((currentPage-1)*qty, currentPage*qty);
        let tableForRender = [];

        if (table.length) {
            tableForRender = table.map(
                (key, i) => (
                    <tr key = { table[i][0] }>
                        <td>{ table[i][1] }</td>
                        <td> <img
                            className = { Styles.icon }
                            src = { table[i][2] }
                        /></td>
                        <td className = { Styles.absorbingColumn }>{ table[i][3] }</td>
                    </tr>
                ));
        }

        return (

            <table>
                <caption className = { Styles.tableCaption }>Cryptocurrency</caption>
                <tbody>
                    <tr>
                        <th>&#8470;</th>
                        <th>Icon</th>
                        <th>Name</th>
                    </tr>
                    { tableForRender }
                </tbody>
            </table>
        );
    }
}
const mapStateToProps = (state) => ({
    searcher:    state.searchReducer,
    cryptoList:  state.cryptoReducer.cryptoList,
    currentPage: state.paginationReducer.currentPage,
    qty:         state.paginationReducer.qtyCryptosInTable
});

export default connect(mapStateToProps)(CryptoTable);
