import React, { Component } from 'react';
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changePage } from '../../actions/paginationActions';


class Pagination extends Component {
    static propTypes = {
        cryptoList:  PropTypes.array.isRequired,
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
        const { cryptoList, currentPage, qty } = this.props;
        const pageNumbers = [];
        const pageQty = Math.ceil(cryptoList.length / qty);
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
            pageNumberForRender.push(dots, pageList[currentPage - 2], pageList[currentPage - 1], pageList[currentPage], dots, pageList[pageList.length - 1]);
        }

        pageNumberForRender = qty === cryptoList.length
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
    cryptoList:  state.cryptoReducer.cryptoList,
    qty:         state.paginationReducer.qtyCryptosInTable
});

export default connect(mapStateToProps)(Pagination);
