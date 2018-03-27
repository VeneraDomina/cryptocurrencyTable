import React, { Component } from 'react';
import Styles from './styles.scss';
import PropTypes from 'prop-types';


export default class CryptoTable extends Component {
    static propTypes = {
        tableContent: PropTypes.array.isRequired
    };

    shouldComponentUpdate (nextProps) {
        if (!this.props.tableContent[0]) {
            return true;
        }

        return this.props.tableContent.length !== nextProps.tableContent.length
            ? true
            : this.props.tableContent[0].key !== nextProps.tableContent[0].key;

    }


    render () {
        const { tableContent } = this.props;

        return (

            <table>
                <caption className = { Styles.tableCaption }>Cryptocurrency</caption>
                <tbody>
                    <tr>
                        <th>&#8470;</th>
                        <th>Icon</th>
                        <th>Name</th>
                    </tr>
                    { tableContent }
                </tbody>
            </table>
        );
    }
}
