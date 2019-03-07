import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

import Dividend from '../dividend/dividend';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfSymbol: [],
            listOfBuy: [],
            listOfDividend: [],
            listOfPrice: [],
        }
    }

    componentDidMount() {
        let url = "/allBuy/" + this.props.user_id ;
        let reactThis = this;
        this.setState({listOfBuy: []});
        let reqListener = function () {
            let data = JSON.parse(this.responseText);
            for (let i = 0; i < data.length; i++) {
                reactThis.setState({listOfBuy: [Object.assign({},data[i]), ...reactThis.state.listOfBuy]});
            }
        }

        let oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url);
        oReq.send();
    }

    render() {

        let itemsElements = this.state.listOfBuy.map( (item, index) => {
            return (
                <tr key={index}>
                    <td className={styles.td}> {item["company_symbol"]} </td>
                    <td className={styles.td}> {item["purchase_date"].substring(0, 10)} </td>
                    <td className={styles.td}> {item["quantity"]} </td>
                    <td className={styles.td}> {item["currency"] + " " +item["price"]} </td>
                </tr>
            );
        })

        return (
            <div className={styles.mainDiv}>
                <div className={styles.headerDiv}>
                    <h2 className={styles.header}> My Portfolio </h2>
                </div>
                <div className={styles.div}>
                    {this.state.listOfBuy.length > 0 && <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th} >Symbol</th>
                                <th className={styles.th} >Date Of Purchase</th>
                                <th className={styles.th}>No of stock</th>
                                <th className={styles.th}>Bought Price Per Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsElements}
                        </tbody>
                    </table>}
                </div>
                {this.state.listOfBuy.length > 0 &&
                    < Dividend listOfBuy={this.state.listOfBuy} user_id={this.props.user_id} />}
            </div>
        );
    }
}

export default Portfolio;

Portfolio.propTypes = {
  user_id: PropTypes.number,
};