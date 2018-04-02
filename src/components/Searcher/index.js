import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

export default class Searcher extends Component {
    static propTypes = {
        findCrypto: PropTypes.func.isRequired
    };
    constructor () {
        super();
        this.findCrypto =:: this._findCrypto;
    }

    shouldComponentUpdate () {
        return false;
    }

    _findCrypto () {
        this.props.findCrypto(this.inputCrypto.value);
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
