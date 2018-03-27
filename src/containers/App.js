import React, { Component } from 'react';
import './App.css';
import Feed from '../components/Feed';

export default class App extends Component {

    options = {
        api:      'https://min-api.cryptocompare.com/data/all/coinlist',
        apiImage: 'https://www.cryptocompare.com'
    };

    render () {
        return (<Feed
            api = { this.options.api }
            apiImage = { this.options.apiImage }
        />);
    }
}
