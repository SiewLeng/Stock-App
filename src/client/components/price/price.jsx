import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

import Sgdprice from '../sgdprice/sgdprice'

class Price extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfPrice: [],
        }
        this. handleClick1 = this.handleClick1.bind(this)
    }

   handleClick1() {
        let listOfSymbol = this.props.listOfSymbol;
        let reactThis = this;
        let templistOfPrice = [];
        for (let i = 0; i < listOfSymbol.length; i++) {
            setTimeout(function() {
                let url = "/queryStockEndPoint?search=" + listOfSymbol[i];
                let reqListener = function () {
                    let data = JSON.parse(this.responseText)["Global Quote"];
                    for (let j = 0; j < reactThis.props.listOfDividend.length; j++) {
                        if (listOfSymbol[i] == reactThis.props.listOfDividend[j]["buy_item"]["company_symbol"]) {
                            let obj = {
                                buy_item: reactThis.props.listOfDividend[j]["buy_item"],
                                dividend: reactThis.props.listOfDividend[j]["dividend"],
                                price: parseFloat(data["05. price"]),
                            }
                            templistOfPrice.push(Object.assign({}, obj));
                            reactThis.setState({listOfPrice: templistOfPrice});
                        }
                    }
                }
                let oReq = new XMLHttpRequest();
                oReq.addEventListener("load", reqListener);
                oReq.open("GET", url);
                oReq.send();
            }, i * 15000);
        }
    }

    render() {

        let itemsElements = this.state.listOfPrice.map( (item, index) => {
            return (
                <tr key={index}>
                    <td className={styles.td}> {item["buy_item"]["company_symbol"]} </td>
                    <td className={styles.td}> {item["buy_item"]["purchase_date"].substring(0, 10)} </td>
                    <td className={styles.td}> {item["buy_item"]["quantity"]} </td>
                    <td className={styles.td}> {item["buy_item"]["currency"] + " " +item["buy_item"]["price"]} </td>
                    <td className={styles.td}> {item["buy_item"]["currency"] + " " +item["price"]} </td>
                    <td className={styles.td}> {item["buy_item"]["currency"] + " " +item["dividend"]} </td>
                    <td className={styles.td}>
                        {((item["price"]+item["dividend"]-item["buy_item"]["price"]) / item["buy_item"]["price"] * 100).toFixed(2) }
                    </td>
                </tr>
            );
        })

        return (
                <div className={styles.div}>
                    <div>
                        <button onClick={this.handleClick1}>
                            Calculate Price
                        </button>
                    </div>
                    {this.state.listOfPrice.length == this.props.listOfDividend.length && <table className={styles.table}>
                        <tbody>
                            <tr>
                                <th className={styles.th} >Symbol</th>
                                <th className={styles.th} >Date Of Purchase</th>
                                <th className={styles.th}>No of stock</th>
                                <th className={styles.th}>Bought Price Per Stock</th>
                                <th className={styles.th}>Current Price Per Stock</th>
                                <th className={styles.th}>Dividend Per Stock</th>
                                <th className={styles.th}> Gain (%)</th>
                            </tr>
                            {itemsElements}
                        </tbody>
                    </table>}
                    {this.state.listOfPrice.length == this.props.listOfDividend.length
                        && <Sgdprice listOfPrice={this.state.listOfPrice} user_id={this.props.user_id} listOfSymbol={this.props.listOfSymbol}/>}
                </div>
        );
    }
}

export default Price;

Price.propTypes = {
  listOfSymbol: PropTypes.array,
  listOfDividend: PropTypes.array,
  user_id: PropTypes.number,
};