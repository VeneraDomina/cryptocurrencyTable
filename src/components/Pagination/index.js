import React, { Component } from 'react';
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changePage } from '../../actions/paginationActions';


class Pagination extends Component {
    static propTypes = {
        cryptos:     PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
        currentPage: PropTypes.number.isRequired,
        dispatch:    PropTypes.func.isRequired,
        qty:         PropTypes.number.isRequired
    };

    constructor () {
        super();
        this.changePage =:: this._changePage;
    }

    shouldComponentUpdate (nextProps) {
        return !(this.props.qty === nextProps.qty && this.props.currentPage === nextProps.currentPage);
    }

    _changePage (e) {
        this.props.dispatch(changePage(Number(e.target.innerHTML)));
    }

    render () {
        const { cryptos, currentPage, qty } = this.props;
        const qtyCommon = Object.keys(cryptos).length;
        const pageNumbers = [];
        const pageQty = Math.ceil(qtyCommon / qty);
        const dots = <span className = { Styles.dots }>&hellip;</span>;
        let pageNumberForRender = null;

        for (let i = 1; i < pageQty; i++) {
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

        pageNumberForRender = qty === qtyCommon
            ? <p />
            : pageNumberForRender;

        return (
            <div className = { Styles.pagination }>
                { pageNumberForRender }
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    currentPage: state.paginationReducer.currentPage,
    cryptos:     state.cryptosReducer.items,
    qty:         state.paginationReducer.qtyCryptosInTable
});

export default connect(mapStateToProps)(Pagination);
