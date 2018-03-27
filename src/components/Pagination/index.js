import React, { Component } from 'react';
import Styles from './styles.scss';
import PropTypes from 'prop-types';


export default class Pagination extends Component {
    static propTypes = {
        cryptosQtyCommon:   PropTypes.number.isRequired,
        currentPage:        PropTypes.number.isRequired,
        qtyCryptosInTable:  PropTypes.number.isRequired,
        showCryptosPerPage: PropTypes.func.isRequired
    };

    constructor () {
        super();
        this.showCryptosPerPage =:: this._showCryptosPerPage;
    }


    shouldComponentUpdate (nextProps) {
        if (this.props.currentPage === 1) {
            return true;
        }

        return !(this.props.currentPage === nextProps.currentPage);
    }

    _showCryptosPerPage (e) {
        this.props.showCryptosPerPage(e.target.innerHTML);
    }

    render () {
        const { cryptosQtyCommon, currentPage, qtyCryptosInTable } = this.props;
        const pageNumbers = [];
        const pageQty = Math.ceil(cryptosQtyCommon / qtyCryptosInTable);
        const dots = <span className = { Styles.dots }>&hellip;</span>;
        let pageNumberForRender = null;

        for (let i = 1; i < pageQty; i++) {
            pageNumbers.push(i);
        }

        const pageList = pageNumbers.map((number) => (
            <a
                className = { currentPage === number ? `${Styles.paginationItem} ${Styles.isSelected}` : Styles.paginationItem }
                onClick = { this.showCryptosPerPage }>
                { number }
            </a>
        ));

        if (qtyCryptosInTable !== cryptosQtyCommon) {
            if (currentPage === 1 || currentPage === 2 || currentPage === 3) {
                pageNumberForRender = pageList.slice(0, 5);
                pageNumberForRender.push(dots, pageList[pageList.length - 1]);
            } else if (currentPage === pageQty - 1 || currentPage === pageQty - 2 || currentPage === pageQty - 3) {
                pageNumberForRender = pageList.slice(0, 1);
                pageNumberForRender.push(dots, pageList.slice([pageList.length - 6]));
            } else {
                pageNumberForRender = pageList.slice(0, 1);
                pageNumberForRender.push(dots, pageList[currentPage - 2], pageList[currentPage - 1], pageList[currentPage + 1], dots, pageList[pageList.length - 1]);
            }
        }

        return (
            <div className = { Styles.pagination }>
                { pageNumberForRender }
            </div>
        );
    }
}
