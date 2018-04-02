import React, { Component } from 'react';
import Styles from './styles.scss';
import PropTypes from 'prop-types';

export default class TopPagination extends Component {
    static propTypes = {
        changeQty:  PropTypes.func.isRequired,
        cryptoList: PropTypes.array.isRequired,
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

        this.props.changeQty(qty);
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
                        className = { qty === 200 ? Styles.isSelected : Styles.notSelected }
                        href = '#'
                        onClick = { this.changeQty }>
                        200</a></li>
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
