import React, { Component } from 'react';
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeQty } from '../../actions/paginationActions';


class TopPagination extends Component {
    static propTypes = {
        cryptoList: PropTypes.array.isRequired,
        dispatch:   PropTypes.func.isRequired,
        qty:        PropTypes.number.isRequired
    };
    constructor () {
        super();
        this.changeQty =:: this._changeQty;
    }

    shouldComponentUpdate (nextProps) {
        return this.props.qty !== nextProps.qty;
    }

    _changeQty (e) {
        const qty = Number(e.target.innerHTML) || this.props.cryptoList.length;

        this.props.dispatch(changeQty(qty));
    }
    render () {
        const { qty } = this.props;

        return (
            <nav>
                <ul>
                    <li><a
                        className = { qty === 15 ? Styles.isSelected : Styles.notSelected }
                        href = '#'
                        onClick = { this.changeQty }>
                        15</a></li>
                    <li><a
                        className = { qty === 50 ? Styles.isSelected : Styles.notSelected }
                        href = '#'
                        onClick = { this.changeQty }>
                        50</a></li>
                    <li><a
                        className = { qty === 100 ? Styles.isSelected : Styles.notSelected }
                        href = '#'
                        onClick = { this.changeQty }>
                        100</a></li>
                    <li><a
                        className = { qty > 100 ? Styles.isSelected : Styles.notSelected }
                        href = '#'
                        onClick = { this.changeQty }>
                        All</a></li>
                </ul>
            </nav>
        );
    }
}
const mapStateToProps = (state) => ({
    cryptoList: state.cryptoReducer.cryptoList,
    qty:        state.paginationReducer.qtyCryptosInTable
});

export default connect(mapStateToProps)(TopPagination);
