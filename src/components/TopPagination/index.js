import React, { Component } from 'react';
import Styles from './styles.scss';
import PropTypes from 'prop-types';


export default class TopPagination extends Component {
    static propTypes = {
        changeQtyCryptosInTable: PropTypes.func.isRequired,
        cryptosQtyCommon:        PropTypes.number.isRequired,
        qtyCryptosInTable:       PropTypes.number.isRequired
    };
    constructor () {
        super();
        this.changeQty =:: this._changeQty;
    }

    shouldComponentUpdate (nextProps) {
        return this.props.qtyCryptosInTable !== nextProps.qtyCryptosInTable;
    }

    _changeQty (e) {
        const qty = Number(e.target.innerHTML) || Number(this.props.cryptosQtyCommon);

        this.props.changeQtyCryptosInTable(qty);
    }
    render () {
        const { qtyCryptosInTable } = this.props;

        return (
            <nav>
                <ul>
                    <li><a
                        className = { qtyCryptosInTable === 15 ? Styles.isSelected : Styles.notSelected }
                        href = '#'
                        onClick = { this.changeQty }>
                        15</a></li>
                    <li><a
                        className = { qtyCryptosInTable === 50 ? Styles.isSelected : Styles.notSelected }
                        href = '#'
                        onClick = { this.changeQty }>
                        50</a></li>
                    <li><a
                        className = { qtyCryptosInTable === 100 ? Styles.isSelected : Styles.notSelected }
                        href = '#'
                        onClick = { this.changeQty }>
                        100</a></li>
                    <li><a
                        className = { qtyCryptosInTable > 100 ? Styles.isSelected : Styles.notSelected }
                        href = '#'
                        onClick = { this.changeQty }>
                        All</a></li>
                </ul>
            </nav>
        );
    }
}
