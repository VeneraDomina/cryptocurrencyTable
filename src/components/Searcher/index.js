import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findCrypto } from '../../actions/searcherAction';
import Styles from './styles.scss';

class Searcher extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        searcher: PropTypes.string.isRequired
    };
    constructor () {
        super();
        this.findCrypto =:: this._findCrypto;
    }

    shouldComponentUpdate (nextProps) {
        return !this.props.searcher === nextProps.searcher;
    }

    _findCrypto () {
        this.props.dispatch(findCrypto(this.inputCrypto.value));
    }

    render () {
        return (
            <div>
                <input
                    className = { Styles.searchField }
                    placeholder = 'search...'
                    ref = { (input) => {
                        this.inputCrypto = input;
                    } }
                    type = 'search...'
                    onChange = { this.findCrypto }
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    searcher: state.searchReducer
});

export default connect(mapStateToProps)(Searcher);
