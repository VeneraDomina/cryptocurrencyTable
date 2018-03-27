import React, { Component } from 'react';
import axios from 'axios';
import { string } from 'prop-types';
import Styles from './styles.scss';

import TopPagination from '../TopPagination';
import CryptoTable from '../CryptoTable';
import Pagination from '../Pagination';


export default class Feed extends Component {
    static propTypes = {
        api:      string.isRequired,
        apiImage: string.isRequired
    };

    constructor () {
        super();
        this.showCryptosPerPage =:: this._showCryptosPerPage;
        this.changeQtyCryptosInTable =:: this._changeQtyCryptosInTable;
    }

    state = {
        cryptosList:       [],
        currentPage:       1,
        tableContent:      [],
        qtyCryptosInTable: 15
    };

    componentWillMount () {
        this._getCryptos();
    }

    _getCryptos () {
        axios.get(this.props.api)
            .then((res) => {

                let cryptosList = res.data;
                let cryptoNumber = null;
                const { apiImage } = this.props;
                const cryptoAbbreviation = Object.keys(cryptosList.Data);

                cryptosList = cryptoAbbreviation.map(
                    (key) => (
                        <tr key = { cryptosList.Data[key].Id }>
                            <td>{ ++cryptoNumber }</td>
                            <td> <img
                                className = { Styles.icon }
                                src = { apiImage + cryptosList.Data[key].ImageUrl }
                            /></td>
                            <td className = { Styles.absorbingColumn }>{ cryptosList.Data[key].CoinName }</td>
                        </tr>
                    ));
                this.setState({ cryptosList }, () => this._showCryptosPerPage(1));
            });
    }

    _showCryptosPerPage (page) {
        const { cryptosList, qtyCryptosInTable } = this.state;
        const tableContent = cryptosList.slice((page-1)*qtyCryptosInTable, (page-1)*qtyCryptosInTable+qtyCryptosInTable);

        this.setState(() => ({
            tableContent,
            currentPage: page
        }));
    }

    _changeQtyCryptosInTable (qty) {
        this.setState({ qtyCryptosInTable: qty }, () => this._showCryptosPerPage(1));
    }

    render () {

        const { cryptosList, tableContent, qtyCryptosInTable, currentPage } = this.state;
        const { apiImage } = this.props;
        const currentPageInt = Number(currentPage);
        const cryptosQtyCommon = Object.keys(cryptosList).length;

        return (
            <section>
                <TopPagination
                    changeQtyCryptosInTable = { this.changeQtyCryptosInTable }
                    cryptosQtyCommon = { cryptosQtyCommon }
                    qtyCryptosInTable = { qtyCryptosInTable }
                />
                <CryptoTable
                    apiImage = { apiImage }
                    tableContent = { tableContent }
                />
                <Pagination
                    cryptosQtyCommon = { cryptosQtyCommon }
                    currentPage = { currentPageInt }
                    qtyCryptosInTable = { qtyCryptosInTable }
                    showCryptosPerPage = { this.showCryptosPerPage }
                />
            </section>
        );
    }
}
