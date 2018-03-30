import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.scss';

import TopPagination from '../TopPagination';
import CryptoTable from '../CryptoTable';
import Pagination from '../Pagination';
import Searcher from '../Searcher';
import { fetchCryptos } from '../../actions/cryptoActions';


class Feed extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        loading:  PropTypes.bool.isRequired,
        error:    PropTypes.oneOf([null, PropTypes.object])
    };

    componentDidMount () {
        this.props.dispatch(fetchCryptos());
    }

    render () {
        const { error, loading } = this.props;

        if (error) {
            return <div>Error! { error.message }</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <section>
                <Searcher />
                <TopPagination />
                <CryptoTable />
                <Pagination />
            </section>
        );
    }
}
const mapStateToProps = (state) => ({
    loading: state.cryptoReducer.loading,
    error:   state.cryptoReducer.error
});

export default connect(mapStateToProps)(Feed);
