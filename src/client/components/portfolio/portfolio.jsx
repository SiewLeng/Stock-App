import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

import main_styles from '../../style.scss';

import Dividend from '../dividend/dividend';

class Portfolio extends React.Component {
    constructor() {
        super();
        this.state = {
            listOfSymbol: [],
            listOfBuy: [],
            listOfDividend: [],
            listOfPrice: [],
            showTable: false,
            showDividend: false,
        }
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    }

    handleClick1() {
        this.setState({showTable: true});
        let url = "/allBuy" ;
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

    handleClick2() {
        let listOfSymbol = [];
        for (let i = 0; i < this.state.listOfBuy.length; i++) {
            let repeated = false;
            for (let j = 0; j < listOfSymbol.length; j++) {
                if (this.state.listOfBuy[i]["company_symbol"] == listOfSymbol[j]) {
                    repeated = true;
                    break;
                }
            }
            if (!repeated) {
                listOfSymbol.push(this.state.listOfBuy[i]["company_symbol"]);
            }
        }
        let reactThis = this;

        let templistOfDividend = [];
        for (let i = 0; i < listOfSymbol.length; i++) {
            let url = "/queryStockMonthly?search=" + listOfSymbol[i];
            let reqListener = function () {
                let data = JSON.parse(this.responseText)["Monthly Adjusted Time Series"];
                for (let j = 0; j < reactThis.state.listOfBuy.length; j++) {
                    if (listOfSymbol[i] == reactThis.state.listOfBuy[j]["company_symbol"]) {
                        let dividend = 0;
                        let date = reactThis.state.listOfBuy[j]["purchase_date"].substring(0, 10);
                        let year = date.substring(0, 4);
                        let month = date.substring(5, 7);
                        let day = date.substring(8, 10);
                        for (let key in data) {
                            if (!(key.substring(0, 4) == year && key.substring(5, 7) == month && key.substring(8, 10) == day) ) {
                                dividend = dividend + parseFloat(data[key]["7. dividend amount"]);
                            }
                            if (key.substring(0, 4) == year && key.substring(5, 7) == month) {
                                break;
                            }
                        }
                        let obj = {
                            buy_item: reactThis.state.listOfBuy[j],
                            dividend: dividend,
                        }
                        templistOfDividend.push(Object.assign({}, obj));
                        reactThis.setState({listOfDividend: templistOfDividend});
                    }
                }

            }
            let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", reqListener);
            oReq.open("GET", url);
            oReq.send();
        }
    }

    render() {

        let listOfElement1 = this.state.listOfDividend.map( (item1, index1) => {

            return (
                <tr key={index1}>
                    <td className={styles.td}> {item1["buy_item"]["company_symbol"]} </td>
                    <td className={styles.td}> {item1["buy_item"]["purchase_date"].substring(0, 10)} </td>
                    <td className={styles.td}> {item1["buy_item"]["quantity"]} </td>
                    <td className={styles.td}> {item1["buy_item"]["currency"] + " " + item1["buy_item"]["price"]} </td>
                    <td className={styles.td}> {item1["buy_item"]["currency"] + " " + item1["dividend"]} </td>
                </tr>
            );
        })

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
                    <h2> My Portfolio </h2>
                </div>
                <div className={styles.div}>
                    <button onClick={this.handleClick1}> Show My Portfolio </button>
                </div>
                <div className={styles.div}>
                    {this.state.listOfBuy.length > 0 && <table className={styles.table}>
                        <tr>
                            <th className={styles.th} >Symbol</th>
                            <th className={styles.th} >Date Of Purchase</th>
                            <th className={styles.th}>No of stock</th>
                            <th className={styles.th}>Bought Price Per Stock</th>
                        </tr>
                            {itemsElements}
                    </table>}
                </div>
                {this.state.listOfBuy.length > 0 && < Dividend listOfBuy={this.state.listOfBuy}/>}
            </div>
        );
    }
}

export default Portfolio;