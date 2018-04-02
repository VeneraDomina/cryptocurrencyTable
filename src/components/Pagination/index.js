import React, { Component } from 'react';
import Styles from './styles.scss';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
    static propTypes = {
        changePage:  PropTypes.func.isRequired,
        cryptoList:  PropTypes.array.isRequired,
        currentPage: PropTypes.number.isRequired,
        qty:         PropTypes.number.isRequired
    };

    constructor () {
        super();
        this.changePage =:: this._changePage;
    }

    shouldComponentUpdate (nextProps) {
        return !(this.props.qty === nextProps.qty && this.props.currentPage === nextProps.currentPage && this.props.cryptoList.length === nextProps.cryptoList.length);
    }

    _changePage (e) {
        this.props.changePage(Number(e.target.innerHTML));
    }

    render () {
        const { cryptoList, currentPage, qty } = this.props;
        const pageNumbers = [];
        const pageQty = Math.ceil(cryptoList.length / qty);
        const dots = <span className = { Styles.dots }>&hellip;</span>;
        let pageNumberForRender = [];

        for (let i = 1; i <= pageQty; i++) {
            pageNumbers.push(i);
        }

        const pageList = pageNumbers.map((number) => (
            <a
                className = { currentPage === number ? `${Styles.paginationItem} ${Styles.isSelected}` : Styles.paginationItem }
                href = '#'
                key = { number }
                onClick = { this.changePage }>
                { number }
            </a>
        ));

        if (currentPage === 1 || currentPage === 2 || currentPage === 3 || currentPage === 4) {
            pageNumberForRender = pageList.slice(0, 5);
            if (pageQty > 5) {
                pageNumberForRender.push(dots, pageList[pageList.length - 1]);
            }
        } else if (currentPage === pageQty || currentPage === pageQty - 1 || currentPage === pageQty - 2 || currentPage === pageQty - 3) {
            pageNumberForRender = pageList.slice(0, 1);
            pageNumberForRender.push(dots, pageList.slice([pageList.length - 6]));
        } else {
            pageNumberForRender = pageList.slice(0, 1);
            pageNumberForRender.push(dots, pageList[currentPage - 2], pageList[currentPage - 1], pageList[currentPage], dots, pageList[pageList.length - 1]);
        }

        pageNumberForRender = pageQty === 1
            ? <p />
            : pageNumberForRender;

        return (
            <div className = { Styles.pagination }>
                { pageNumberForRender }
            </div>
        );
    }
}
