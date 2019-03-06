import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

import main_styles from '../../style.scss';

import Price from '../price/price';

class Dividend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfDividend: [],
            listOfSymbol: [],
        }
        this.handleClick1 = this.handleClick1.bind(this);
    }

    handleClick1 () {
        console.log("clicked button");
        let listOfSymbol = [];
        for (let i = 0; i < this.props.listOfBuy.length; i++) {
            let repeated = false;
            for (let j = 0; j < listOfSymbol.length; j++) {
                if (this.props.listOfBuy[i]["company_symbol"] == listOfSymbol[j]) {
                    repeated = true;
                    break;
                }
            }
            if (!repeated) {
                listOfSymbol.push(this.props.listOfBuy[i]["company_symbol"]);
            }
        }
        this.setState({listOfSymbol: listOfSymbol});

        let reactThis = this;
        let templistOfDividend = [];
        for (let i = 0; i < listOfSymbol.length; i++) {
            setTimeout(function () {
                let url = "/queryStockMonthly?search=" + listOfSymbol[i];
                let reqListener = function () {
                    let data = JSON.parse(this.responseText)["Monthly Adjusted Time Series"];
                    for (let j = 0; j < reactThis.props.listOfBuy.length; j++) {
                        if (listOfSymbol[i] == reactThis.props.listOfBuy[j]["company_symbol"]) {
                            let dividend = 0;
                            let date = reactThis.props.listOfBuy[j]["purchase_date"].substring(0, 10);
                            let year = date.substring(0, 4);
                            let month = date.substring(5, 7);
                            let day = date.substring(8, 10);
                            for (let key in data) {
                                if (key.substring(0, 4) == year && key.substring(5, 7) == month) {
                                    if (key.substring(8, 10) > day) {
                                        dividend = dividend + parseFloat(data[key]["7. dividend amount"]);
                                    }
                                }
                                else {
                                    dividend = dividend + parseFloat(data[key]["7. dividend amount"]);
                                }
                                if (key.substring(0, 4) == year && key.substring(5, 7) == month) {
                                    break;
                                }
                            }
                            let obj = {
                                buy_item: reactThis.props.listOfBuy[j],
                                dividend: dividend,
                            }
                            console.log(obj);
                            templistOfDividend.push(Object.assign({}, obj));
                            reactThis.setState({listOfDividend: templistOfDividend});
                        }
                    }
                }
                let oReq = new XMLHttpRequest();
                oReq.addEventListener("load", reqListener);
                oReq.open("GET", url);
                oReq.send();
            }, i * 12000)
        };
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

        return (
            <div className={styles.div}>
                <div className={styles.div}>
                    <div>
                        {this.props.listOfBuy.length > 0 &&
                            <button onClick={this.handleClick1}>
                                Calculate Dividends
                            </button>}
                    </div>
                    {this.state.listOfDividend.length == this.props.listOfBuy.length && <table className={styles.table}>
                        <tbody>
                            <tr>
                                <th className={styles.th} >Symbol</th>
                                <th className={styles.th} >Date Of Purchase</th>
                                <th className={styles.th}>No of stock</th>
                                <th className={styles.th}>Bought Price Per Stock</th>
                                <th className={styles.th} >Dividend per stock</th>
                            </tr>
                            {listOfElement1}
                        </tbody>
                    </table>}
                </div>
                {this.state.listOfDividend.length == this.props.listOfBuy.length &&
                    <Price listOfDividend={this.state.listOfDividend} user_id={this.props.user_id}
                        listOfSymbol={this.state.listOfSymbol}/>}
            </div>
        );
    }
}

export default Dividend;