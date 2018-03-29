import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Styles from './styles.scss';


class CryptoTable extends Component {
    static propTypes = {
        cryptoList:  PropTypes.array.isRequired,
        currentPage: PropTypes.number.isRequired,
        qty:         PropTypes.number.isRequired
    };

    shouldComponentUpdate (nextProps) {
        return !(this.props.qty === nextProps.qty && this.props.currentPage === nextProps.currentPage);
    }

    render () {
        const { cryptoList, currentPage, qty } = this.props;
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
    cryptoList:  state.cryptoReducer.cryptoList,
    currentPage: state.paginationReducer.currentPage,
    qty:         state.paginationReducer.qtyCryptosInTable
});

export default connect(mapStateToProps)(CryptoTable);
